import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private readonly permissionRepo: Repository<Permission>) {}

  create(dto: CreatePermissionDto) {
    const entity = this.permissionRepo.create(dto);
    return this.permissionRepo.save(entity);
  }

  findAll() {
    return this.permissionRepo.find();
  }
}
