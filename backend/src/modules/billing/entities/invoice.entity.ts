import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';
import { InvoiceItem } from './invoice-item.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @ManyToOne(() => Patient, patient => patient.invoices, { eager: true })
  patient: Patient;

  @ManyToOne(() => User, user => user.invoices, { eager: true })
  createdBy: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true })
  status?: string;

  @OneToMany(() => InvoiceItem, item => item.invoice, { cascade: true, eager: true })
  items: InvoiceItem[];
}
