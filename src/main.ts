import * as helmet from 'helmet';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { CustomExceptionFilter } from './common/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);

  // enabling for cors policy
  app.enableCors();

  app.use(helmet());

  // using the filters
  app.useGlobalFilters(new CustomExceptionFilter());

  const PORT = configService.get<number>('config.app.port');
  const ENVIRONMENT = configService.get<string>('config.environment');

  await app.listen(PORT);

  Logger.debug(`server listening at ${PORT} | ${ENVIRONMENT} `, 'main.ts');
}

bootstrap();
