import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntry, QueueStatus } from './entities/queue-entry.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { QueueGateway } from './queue.gateway';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueEntry) private readonly queueRepo: Repository<QueueEntry>,
    @InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>,
    private readonly queueGateway: QueueGateway,
  ) {}

  async listPublicQueue() {
    const entries = await this.queueRepo.find({
      relations: ['doctor', 'patient'],
      order: { position: 'ASC' },
    });
    return entries.reduce<Record<string, QueueEntry[]>>((acc, entry) => {
      if (!acc[entry.doctor.id]) acc[entry.doctor.id] = [];
      acc[entry.doctor.id].push(entry);
      return acc;
    }, {});
  }

  async advance(doctorId: string) {
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const nextEntry = await this.queueRepo.findOne({
      where: { doctor: { id: doctorId }, status: QueueStatus.Waiting },
      order: { position: 'ASC' },
    });

    if (!nextEntry) {
      return { message: 'Queue empty' };
    }

    nextEntry.status = QueueStatus.Serving;
    await this.queueRepo.save(nextEntry);
    this.queueGateway.emitNext(doctorId, nextEntry);
    await this.broadcastSnapshot(doctorId);
    return nextEntry;
  }

  async skip(doctorId: string) {
    const serving = await this.queueRepo.findOne({
      where: { doctor: { id: doctorId }, status: QueueStatus.Serving },
    });
    if (!serving) throw new NotFoundException('No active entry');

    serving.status = QueueStatus.Skipped;
    await this.queueRepo.save(serving);
    this.queueGateway.emitSkip(doctorId, serving);
    await this.broadcastSnapshot(doctorId);
    return serving;
  }

  async recall(doctorId: string) {
    const skipped = await this.queueRepo.findOne({
      where: { doctor: { id: doctorId }, status: QueueStatus.Skipped },
      order: { updatedAt: 'DESC' },
    });
    if (!skipped) throw new NotFoundException('No skipped entry');

    skipped.status = QueueStatus.Serving;
    await this.queueRepo.save(skipped);
    this.queueGateway.emitNext(doctorId, skipped);
    await this.broadcastSnapshot(doctorId);
    return skipped;
  }

  private async broadcastSnapshot(doctorId: string) {
    const queue = await this.queueRepo.find({
      where: { doctor: { id: doctorId } },
      relations: ['patient', 'doctor'],
      order: { position: 'ASC' },
    });
    this.queueGateway.broadcastUpdate(doctorId, queue);
  }
}
