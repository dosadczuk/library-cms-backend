import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const host = process.env.APP_HOST || 'localhost';
  const port = process.env.APP_PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  await app.listen(port, host, () => {
    console.log(`App started on ${host}:${port}`);
  });
}

bootstrap();
