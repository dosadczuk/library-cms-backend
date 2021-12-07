import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const host = process.env.APP_HOST || 'localhost';
  const port = process.env.APP_PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  setUpSwagger(app);

  await app.listen(port, host);
}

function setUpSwagger(app: INestApplication) {
  const name = process.env.APP_NAME || 'Library CMS';
  const desc = process.env.APP_DESC || '';

  const builder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(desc)
    .build();

  const document = SwaggerModule.createDocument(app, builder);

  // dostępne pod /api
  SwaggerModule.setup('api', app, document);
}

bootstrap();
