import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Invoice } from './invoice.entity';

@Entity('invoice_items')
export class InvoiceItem extends BaseEntity {
  @ManyToOne(() => Invoice, invoice => invoice.items)
  invoice: Invoice;

  @Column()
  description: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;
}
