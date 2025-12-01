import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('billing')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('invoice')
  @Permissions('billing.create')
  createInvoice(@Body() dto: CreateInvoiceDto, @CurrentUser() user: any) {
    return this.billingService.create(dto, user.sub);
  }

  @Get('invoice/:id')
  @Permissions('billing.read')
  getInvoice(@Param('id') id: string) {
    return this.billingService.findOne(id);
  }
}
