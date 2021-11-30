declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_DESC?: string;
      APP_HOST: string;
      APP_PORT: number;
      APP_VERSION: string;

      DB_PORT: number;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
