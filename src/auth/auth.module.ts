import { AuthController } from '@/auth/controller/auth.controller';
import { AuthService } from '@/auth/service/auth.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService ],
})
export class AuthModule {}
