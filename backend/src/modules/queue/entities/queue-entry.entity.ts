import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Patient } from '../../patients/entities/patient.entity';

export enum QueueStatus {
  Waiting = 'waiting',
  Serving = 'serving',
  Skipped = 'skipped',
  Completed = 'completed',
}

@Entity('queue_entries')
export class QueueEntry extends BaseEntity {
  @ManyToOne(() => Doctor, doctor => doctor.queueEntries, { eager: true })
  doctor: Doctor;

  @ManyToOne(() => Patient, { eager: true })
  patient: Patient;

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.Waiting })
  status: QueueStatus;

  @Column({ type: 'int' })
  position: number;
}
