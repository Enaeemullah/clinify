import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicSetting } from './entities/clinic-setting.entity';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(@InjectRepository(ClinicSetting) private readonly settingsRepo: Repository<ClinicSetting>) {}

  findAll() {
    return this.settingsRepo.find();
  }

  async upsert(dto: UpdateSettingDto) {
    const existing = await this.settingsRepo.findOne({ where: { key: dto.key } });
    if (existing) {
      existing.value = dto.value;
      return this.settingsRepo.save(existing);
    }

    const entity = this.settingsRepo.create(dto);
    return this.settingsRepo.save(entity);
  }
}
