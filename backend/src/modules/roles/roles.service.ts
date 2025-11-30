import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission) private readonly permissionRepo: Repository<Permission>,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    const permissions = dto.permissions?.length
      ? await this.permissionRepo.findBy({
          code: dto.permissions as any,
        })
      : [];

    const entity = this.roleRepo.create({ ...dto, permissions });
    return this.roleRepo.save(entity);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepo.find({ relations: ['permissions'] });
  }

  async assignPermissions(id: string, permissionIds: string[]): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissions = await this.permissionRepo.findBy({ id: In(permissionIds) });
    role.permissions = permissions;
    return this.roleRepo.save(role);
  }
}
