import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private readonly patientRepo: Repository<Patient>) {}

  create(dto: CreatePatientDto) {
    const entity = this.patientRepo.create({ ...dto, dateOfBirth: new Date(dto.dateOfBirth) });
    return this.patientRepo.save(entity);
  }

  findAll() {
    return this.patientRepo.find();
  }

  findOne(id: string) {
    return this.patientRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePatientDto) {
    const entity = await this.patientRepo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Patient not found');
    }
    Object.assign(entity, dto);
    return this.patientRepo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.patientRepo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Patient not found');
    }
    await this.patientRepo.remove(entity);
    return { deleted: true };
  }
}
