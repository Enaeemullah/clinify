import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient) private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
    const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId } });

    if (!patient || !doctor) {
      throw new NotFoundException('Patient or doctor not found');
    }

    const entity = this.appointmentRepo.create({
      patient,
      doctor,
      scheduledAt: new Date(dto.scheduledAt),
      status: dto.status,
      notes: dto.notes,
    });

    return this.appointmentRepo.save(entity);
  }

  findAll() {
    return this.appointmentRepo.find();
  }

  findOne(id: string) {
    return this.appointmentRepo.findOne({ where: { id } });
  }

  async findByDoctor(doctorId: string) {
    return this.appointmentRepo.find({ where: { doctor: { id: doctorId } } });
  }

  async update(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepo.findOne({ where: { id }, relations: ['patient', 'doctor'] });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (dto.patientId) {
      const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
      if (!patient) throw new NotFoundException('Patient not found');
      appointment.patient = patient;
    }

    if (dto.doctorId) {
      const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId } });
      if (!doctor) throw new NotFoundException('Doctor not found');
      appointment.doctor = doctor;
    }

    Object.assign(appointment, {
      ...dto,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : appointment.scheduledAt,
    });

    return this.appointmentRepo.save(appointment);
  }

  async remove(id: string) {
    const entity = await this.appointmentRepo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Appointment not found');
    }
    await this.appointmentRepo.remove(entity);
    return { deleted: true };
  }
}
