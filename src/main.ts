import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // limit data 10MB
  app.use(express.json({ limit: '10mb' }));
  await app.listen(process.env.PORT ?? 5432);
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist:true,
  //   forbidNonWhitelisted:true,
  // }))

}

bootstrap();
