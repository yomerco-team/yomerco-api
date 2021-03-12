import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ReferencesService } from './references.service';

import { Reference } from './reference.entity';

import { UploadFile } from '../../common/interfaces/upload-file.int';

import { CreateInput } from './dto/create-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { UpdateInput } from './dto/update-input.dto';
import { DefaultFindOneInput } from '../../common/dto/default-find-one-input.dto';
@ApiTags('references')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('references')
export class ReferencesController {
  constructor(private readonly service: ReferencesService) {}

  @ApiResponse({
    status: 201,
    description: 'reponse',
    type: Reference
  })
  @Post()
  create(@Body() createInput: CreateInput): Promise<Reference> {
    return this.service.create(createInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: [Reference]
  })
  @Get()
  findAll(@Query() findAllInput: FindAllInput): Promise<Reference[]> {
    return this.service.findAll(findAllInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: Reference
  })
  @Patch(':uniqueCode')
  update(@Param() findOneInput: DefaultFindOneInput, @Body() updateInput: UpdateInput): Promise<Reference> {
    return this.update(findOneInput, updateInput);
  }

  @Post('upload-references')
  @UseInterceptors(FileInterceptor('file'))
  uploadReferences(@UploadedFile() file: UploadFile): any {
    return this.service.uploadReferences(file);
  }
}
