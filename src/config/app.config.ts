import { database } from '@/config/db.config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// wczytujemy config z ENV
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type Configuration = {
  database: TypeOrmModuleOptions;
  jwt: JwtModuleOptions;
  throttler: {
    ttl: number;
    limit: number;
  };
};

export default (): Configuration => ({
  database,
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '3h',
    },
  },
  throttler: {
    ttl: process.env.API_THROTTLE_TTL ?? 60,
    limit: process.env.API_THROTTLE_LIMIT ?? 10,
  },
});
