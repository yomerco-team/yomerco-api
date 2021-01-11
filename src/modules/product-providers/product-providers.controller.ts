import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ProductProvidersService } from './product-providers.service';

import { CreateInput } from './dto/create-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { FindOneInput } from './dto/find-one-input.dto';
import { UpdateInput } from './dto/update-input.dto';

@Controller('product-providers')
export class ProductProvidersController {
  constructor(private readonly service: ProductProvidersService) {}

  @Post()
  public create(@Body() createInput: CreateInput) {
    return {
      message: 'ok'
    };
  }

  @Get()
  public list(@Query() listInput: FindAllInput) {
    return [];
  }

  @Patch(':id')
  public update(@Param() findOneInput: FindOneInput, @Body() updateBodyInput: UpdateInput) {
    return {
      message: 'ok'
    };
  }

  @Delete(':id')
  public delete(@Param() findOneInput: FindOneInput) {
    return {
      message: 'ok'
    };
  }
}
