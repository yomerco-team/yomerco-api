import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { InventoryEntry } from './inventory-entry.entity';
import { InventoryEntriesService } from './inventory-entries.service';

import { UploadFile } from '../../common/interfaces/upload-file.int';

import { CreateInput } from './dto/create-input.dto';
import { DefaultFindOneInput } from '../../common/dto/default-find-one-input.dto';
import { ListInput } from './dto/list-input.dto';
import { UpdateInput } from './dto/update-input.dto';
@ApiTags('inventory-entries')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('inventory-entries')
export class InventoryEntriesController {
  constructor(private readonly service: InventoryEntriesService) {}

  @ApiResponse({
    status: 201,
    description: 'reponse',
    type: InventoryEntry
  })
  @Post()
  public create(@Body() createInput: CreateInput): Promise<any> {
    return this.service.create(createInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: InventoryEntry
  })
  @Post('upload-proof/:id')
  @UseInterceptors(FileInterceptor('file'))
  public uploadProof(@UploadedFile() file: UploadFile, @Param() uploadProofInput: DefaultFindOneInput): Promise<any> {
    return this.service.uploadProof(file, uploadProofInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: [InventoryEntry]
  })
  @Get()
  public list(@Query() listInput: ListInput): Promise<any> {
    return this.service.list(listInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: InventoryEntry
  })
  @Patch(':id')
  public update(@Param() findOneInput: DefaultFindOneInput, @Body() updateInput: UpdateInput): Promise<any> {
    return this.service.update(findOneInput, updateInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: InventoryEntry
  })
  @Delete(':id')
  public delete(@Param() findOneInput: DefaultFindOneInput): Promise<any> {
    return this.service.delete(findOneInput);
  }
}
