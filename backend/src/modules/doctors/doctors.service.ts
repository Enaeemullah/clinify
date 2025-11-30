import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>) {}

  create(dto: CreateDoctorDto) {
    const entity = this.doctorRepo.create(dto);
    return this.doctorRepo.save(entity);
  }

  findAll() {
    return this.doctorRepo.find({ relations: ['queueEntries'] });
  }

  findOne(id: string) {
    return this.doctorRepo.findOne({ where: { id }, relations: ['queueEntries'] });
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const entity = await this.doctorRepo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Doctor not found');
    }
    Object.assign(entity, dto);
    return this.doctorRepo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.doctorRepo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Doctor not found');
    }
    await this.doctorRepo.remove(entity);
    return { deleted: true };
  }

  async getQueueForDoctor(id: string) {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['queueEntries', 'queueEntries.patient'],
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor.queueEntries;
  }
}
