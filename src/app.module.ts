import Config from '@/config/app.config';
import { BooksModule } from '@/modules/books/books.module';
import { FilesModule } from '@/modules/files/files.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
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
        path: path.join(__dirname, '/i18n/'),
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(service: ConfigService) {
        return service.get('database');
      },
    }),
    BooksModule,
    FilesModule,
  ],
  providers: [],
})
export class AppModule {}
