import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class InvoiceItemInput {
  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateInvoiceDto {
  @IsUUID()
  patientId: string;

  @IsArray()
  @ArrayNotEmpty()
  items: InvoiceItemInput[];

  @IsOptional()
  @IsString()
  status?: string;
}
