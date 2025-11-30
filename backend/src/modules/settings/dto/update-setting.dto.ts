import { IsObject, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  key: string;

  @IsObject()
  value: Record<string, any>;
}
