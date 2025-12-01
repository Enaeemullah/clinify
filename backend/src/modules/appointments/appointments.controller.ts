import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('appointments')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @Permissions('appointment.read')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @Permissions('appointment.read')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Get('doctor/:id')
  @Permissions('appointment.read')
  findByDoctor(@Param('id') id: string) {
    return this.appointmentsService.findByDoctor(id);
  }

  @Post()
  @Permissions('appointment.create')
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto);
  }

  @Patch(':id')
  @Permissions('appointment.update')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('appointment.delete')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
