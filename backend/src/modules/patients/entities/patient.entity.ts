import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Invoice } from '../../billing/entities/invoice.entity';

@Entity('patients')
export class Patient extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Invoice, invoice => invoice.patient)
  invoices: Invoice[];
}
