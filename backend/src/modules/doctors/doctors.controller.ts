import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('doctors')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @Permissions('doctor.read')
  findAll() {
    return this.doctorsService.findAll();
  }

  @Post()
  @Permissions('doctor.create')
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @Get(':id')
  @Permissions('doctor.read')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('doctor.update')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('doctor.delete')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }

  @Get(':id/queue')
  @Permissions('queue.read')
  getQueue(@Param('id') id: string) {
    return this.doctorsService.getQueueForDoctor(id);
  }
}
