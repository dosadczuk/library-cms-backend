import config from '@/config/app.config';
import { BooksModule } from '@/modules/books/books.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(service: ConfigService) {
        return service.get('database');
      },
      inject: [ConfigService],
    }),
    BooksModule,
  ],
  providers: [],
})
export class AppModule {}
