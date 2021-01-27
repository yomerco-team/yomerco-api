import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { InventoryEntriesService } from './inventory-entries.service';

import { CreateInput } from './dto/create-input.dto';

@ApiTags('inventory-entries')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('inventory-entries')
export class InventoryEntriesController {
  constructor(private readonly service: InventoryEntriesService) {}

  @Post()
  public create(@Body() createInput: CreateInput): Promise<any> {
    return this.service.create(createInput);
  }

  @Post('upload-proof/:id')
  @UseInterceptors(FileInterceptor('file'))
  public uploadProof(@UploadedFile() file, @Param() uploadProofInput: any) {
    return { message: 'fine' };
  }

  @Get()
  public list(@Query() listInput: any) {
    return [];
  }

  public update(@Param() findOneInput: any, @Body() updateInput: any) {
    return { message: 'fine' };
  }

  public delete(@Param() findOneInput: any) {
    return { message: 'fine' };
  }
}
