import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Permissions('permission.read')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Post()
  @Permissions('permission.create')
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionsService.create(dto);
  }
}
