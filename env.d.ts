declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_DESC?: string;
      APP_HOST: string;
      APP_PORT: number;

      DB_PORT: number;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;

      DB_PGADMIN_EMAIL: string;
      DB_PGADMIN_PASSWORD: string;

      API_THROTTLE_TTL: number;
      API_THROTTLE_LIMIT: number;
    }
  }
}

export {};
