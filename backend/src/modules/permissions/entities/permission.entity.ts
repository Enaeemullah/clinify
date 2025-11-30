import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
}
