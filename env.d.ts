import { TypeOrmModuleOptions } from '@nestjs/typeorm';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_TYPE: TypeOrmModuleOptions.type;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
