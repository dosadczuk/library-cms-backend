import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// wczytujemy config z ENV
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type Configuration = {
  database: TypeOrmModuleOptions;
};

export default (): Configuration => ({
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    migrations: ['database/migrations'],
  },
});
