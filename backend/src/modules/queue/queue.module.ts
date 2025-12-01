import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { QueueEntry } from './entities/queue-entry.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { QueueGateway } from './queue.gateway';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([QueueEntry, Doctor]), CommonModule],
  controllers: [QueueController],
  providers: [QueueService, QueueGateway],
  exports: [QueueService],
})
export class QueueModule {}
