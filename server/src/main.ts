import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
  
const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // const appUrl = configService.get('app.url');

  // Middleware
  app.enableCors({ origin: '*', credentials: true });
  app.enableShutdownHooks();
  app.use(cookieParser());

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
  .setTitle('Cloud Based Resume Builder Backend APIs')
  .setDescription('Developed By: Shaheena Shaik , KavyaSri Devireddy, Roja Pothugunta , Uma Maheshwari Modala')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Server Port
  const port = configService.get<number>('app.port');
  // app.enableCors();
  await app.listen(port);

  Logger.log(`🚀 Server is up and running!`);
};

bootstrap();
