import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { ClinicSetting } from './entities/clinic-setting.entity';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicSetting]), CommonModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
