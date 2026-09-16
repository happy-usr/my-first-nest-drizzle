import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule {}
