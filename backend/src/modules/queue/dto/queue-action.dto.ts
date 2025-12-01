import { IsUUID } from 'class-validator';

export class QueueActionDto {
  @IsUUID()
  doctorId: string;
}
