import { Module } from '@nestjs/common';
import { ReferenceImagesService } from './reference-images.service';
import { ReferenceImagesController } from './reference-images.controller';

@Module({
  providers: [ReferenceImagesService],
  controllers: [ReferenceImagesController]
})
export class ReferenceImagesModule {}
