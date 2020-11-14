import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../../config/app.config';

import { StorageService } from './storage.service';

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule {}
