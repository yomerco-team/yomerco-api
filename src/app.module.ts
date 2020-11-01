import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.config.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const NODE_ENV = process.env.NODE_ENV || 'local';
const envPath = path.resolve(__dirname, `../.env.${NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      load: [appConfig],
      validationSchema: appConfigSchema
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
