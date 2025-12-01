import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { QueueEntry } from '../../queue/entities/queue-entry.entity';

@Entity('doctors')
export class Doctor extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  room?: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => QueueEntry, entry => entry.doctor)
  queueEntries: QueueEntry[];
}
