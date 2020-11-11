import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateInput } from './dto/create-input';

@Controller('reference-images')
export class ReferenceImagesController {
  @Post(':referenceUniqueCode')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Param() createInput: CreateInput): any {
    // eslint-disable-next-line no-console
    console.log(file, createInput);

    return {
      message: 'ok'
    };
  }
}
