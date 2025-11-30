import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Permissions('role.read')
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  @Permissions('role.create')
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Post(':id/permissions')
  @Permissions('role.assignPermissions')
  assignPermissions(@Param('id') id: string, @Body() dto: AssignPermissionsDto) {
    return this.rolesService.assignPermissions(id, dto.permissionIds);
  }
}
