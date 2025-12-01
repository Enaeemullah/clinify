import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueActionDto } from './dto/queue-action.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get('public')
  getPublicQueue() {
    return this.queueService.listPublicQueue();
  }

  @Post('next')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('queue.manage')
  next(@Body() dto: QueueActionDto) {
    return this.queueService.advance(dto.doctorId);
  }

  @Post('skip')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('queue.manage')
  skip(@Body() dto: QueueActionDto) {
    return this.queueService.skip(dto.doctorId);
  }

  @Post('recall')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('queue.manage')
  recall(@Body() dto: QueueActionDto) {
    return this.queueService.recall(dto.doctorId);
  }
}
