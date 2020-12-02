import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';

import { Reference } from './reference.entity';
import { ReferenceImagesModule } from '../reference-images/reference-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reference]),
    forwardRef(() => ReferenceImagesModule)
  ],
  providers: [ReferencesService],
  controllers: [ReferencesController],
  exports: [ReferencesService]
})
export class ReferencesModule {}
