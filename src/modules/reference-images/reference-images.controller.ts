import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReferenceImage } from './reference-image.entity';
import { ReferenceImagesService } from './reference-images.service';

import { UploadFile } from '../../common/interfaces/upload-file.int';

import { CreateInput } from './dto/create-input';
import { RemoveInput } from './dto/remove-input.dto';
@ApiTags('reference-images')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('reference-images')
export class ReferenceImagesController {
  constructor(private readonly service: ReferenceImagesService) {}

  @ApiResponse({
    status: 201,
    description: 'response',
    type: [ReferenceImage]
  })
  @Post(':referenceUniqueCode')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: UploadFile, @Param() createInput: CreateInput): Promise<ReferenceImage[]> {
    return this.service.create(file, createInput);
  }

  @ApiResponse({
    status: 200,
    description: 'response'
  })
  @Delete(':referenceUniqueCode/:id')
  remove(@Param() removeInput: RemoveInput): Promise<any> {
    return this.service.remove(removeInput);
  }
}
