import Config from '@/config/app.config';
import { HttpErrorFilter } from '@/http/http-error.filter';
import { HttpThrottlerGuard } from '@/http/http-throttler.guard';
import { BooksModule } from '@/modules/books/books.module';
import { FilesModule } from '@/modules/files/files.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'pl',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, 'i18n'),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [new HeaderResolver(['x-lang'])],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.get('database');
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.get('throttler');
      },
    }),
    BooksModule,
    AuthModule,
    UsersModule,
    FilesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: HttpThrottlerGuard,
    },
  ],
})
export class AppModule {}
