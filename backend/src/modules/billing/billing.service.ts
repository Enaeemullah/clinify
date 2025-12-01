import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Patient } from '../patients/entities/patient.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoice) private readonly invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceItem) private readonly itemRepo: Repository<InvoiceItem>,
    @InjectRepository(Patient) private readonly patientRepo: Repository<Patient>,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateInvoiceDto, authorId: string) {
    const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const author = await this.usersService.findById(authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const total = dto.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const invoice = this.invoiceRepo.create({
      patient,
      createdBy: author,
      total,
      status: dto.status,
    });
    const savedInvoice = await this.invoiceRepo.save(invoice);

    const items = dto.items.map(item =>
      this.itemRepo.create({
        ...item,
        invoice: savedInvoice,
      }),
    );

    savedInvoice.items = await this.itemRepo.save(items);
    return savedInvoice;
  }

  findOne(id: string) {
    return this.invoiceRepo.findOne({ where: { id }, relations: ['items', 'patient', 'createdBy'] });
  }
}
