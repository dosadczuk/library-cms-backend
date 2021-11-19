import { TypeOrmModuleOptions } from '@nestjs/typeorm';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_HOST: string;
      APP_PORT: number;

      DB_TYPE: TypeOrmModuleOptions.type;
      DB_HOST: string;
      DB_PORT: number;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
