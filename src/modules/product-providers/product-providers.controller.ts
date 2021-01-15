import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductProvider } from './product-provider.entity';

import { ProductProvidersService } from './product-providers.service';

import { CreateInput } from './dto/create-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { FindOneInput } from './dto/find-one-input.dto';
import { UpdateInput } from './dto/update-input.dto';
@ApiTags('references')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('product-providers')
export class ProductProvidersController {
  constructor(private readonly service: ProductProvidersService) {}

  @ApiResponse({
    status: 201,
    description: 'reponse',
    type: ProductProvider
  })
  @Post()
  public create(@Body() createInput: CreateInput): Promise<any> {
    return this.service.create(createInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: [ProductProvider]
  })
  @Get()
  public list(@Query() listInput: FindAllInput): Promise<any> {
    return this.service.list(listInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: ProductProvider
  })
  @Patch(':id')
  public update(@Param() findOneInput: FindOneInput, @Body() updateBodyInput: UpdateInput): Promise<any> {
    return this.service.update(findOneInput, updateBodyInput);
  }

  @ApiResponse({
    status: 200,
    description: 'reponse',
    type: ProductProvider
  })
  @Delete(':id')
  public delete(@Param() findOneInput: FindOneInput): Promise<any> {
    return this.service.delete(findOneInput);
  }
}
