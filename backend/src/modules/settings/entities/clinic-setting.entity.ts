import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';

@Entity('settings')
export class ClinicSetting extends BaseEntity {
  @Column({ unique: true })
  key: string;

  @Column({ type: 'json' })
  value: Record<string, any>;
}
