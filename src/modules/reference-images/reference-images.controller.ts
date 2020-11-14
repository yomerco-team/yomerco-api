import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ReferenceImagesService } from './reference-images.service';

import { CreateInput } from './dto/create-input';

@Controller('reference-images')
export class ReferenceImagesController {
  constructor(private readonly service: ReferenceImagesService) {}

  @Post(':referenceUniqueCode')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file, @Param() createInput: CreateInput): any {
    return this.service.create(file, createInput);
  }
}
