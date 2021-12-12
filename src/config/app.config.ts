import { database } from '@/config/db.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// wczytujemy config z ENV
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type Configuration = {
  database: TypeOrmModuleOptions;
  throttler: {
    ttl: number;
    limit: number;
  };
};

export default (): Configuration => ({
  database,
  throttler: {
    ttl: process.env.API_THROTTLE_TTL ?? 60,
    limit: process.env.API_THROTTLE_LIMIT ?? 10,
  },
});
