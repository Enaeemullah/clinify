import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  doctorId: string;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
