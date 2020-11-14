import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { StorageModule } from 'src/common/storage/storage.module';
import { ReferenceImage } from './reference-image.entity';

import { ReferenceImagesService } from './reference-images.service';
import { ReferenceImagesController } from './reference-images.controller';
import { ReferencesModule } from '../references/references.module';

import appConfig from '../../config/app.config';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    StorageModule,
    TypeOrmModule.forFeature([ReferenceImage]),
    ReferencesModule
  ],
  providers: [ReferenceImagesService],
  controllers: [ReferenceImagesController]
})
export class ReferenceImagesModule {}
