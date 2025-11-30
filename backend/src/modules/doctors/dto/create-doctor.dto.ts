import { IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  fullName: string;

  @IsString()
  specialization: string;

  @IsOptional()
  @IsString()
  room?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
