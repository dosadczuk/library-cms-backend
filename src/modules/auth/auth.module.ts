import { AuthController } from '@/modules/auth/auth.controller';
import { CommandHandlers } from '@/modules/auth/commands';
import { JwtStrategy } from '@/modules/auth/strategies';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.get('jwt');
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers, JwtStrategy],
})
export class AuthModule {}
