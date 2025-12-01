import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';

export enum AppointmentStatus {
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

@Entity('appointments')
export class Appointment extends BaseEntity {
  @ManyToOne(() => Patient, patient => patient.appointments, { eager: true })
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { eager: true })
  doctor: Doctor;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.Scheduled })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
