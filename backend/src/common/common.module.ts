import { Module, forwardRef } from '@nestjs/common';
import { PermissionGuard } from './guards/permissions.guard';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PermissionGuard],
  exports: [PermissionGuard],
})
export class CommonModule {}
