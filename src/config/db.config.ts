import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const database: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export const seeder: ConnectionOptions = {
  name: 'seeder',
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/seeders/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/seeders',
  },
};

export default [database, seeder];
