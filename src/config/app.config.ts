import { database } from '@/config/db.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// wczytujemy config z ENV
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type Configuration = {
  database: TypeOrmModuleOptions;
};

export default (): Configuration => ({ database });
