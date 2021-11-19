import config from '@/config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/app.schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(service: ConfigService) {
        return service.get('database');
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
