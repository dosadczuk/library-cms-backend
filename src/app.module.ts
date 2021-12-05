import Config from '@/config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '@/modules/books/books.module';
import { FilesModule } from '@/modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config],
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
