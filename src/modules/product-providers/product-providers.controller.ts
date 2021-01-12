import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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

  @Post()
  public create(@Body() createInput: CreateInput): Promise<any> {
    return this.service.create(createInput);
  }

  @Get()
  public list(@Query() listInput: FindAllInput): Promise<any> {
    return this.service.list(listInput);
  }

  @Patch(':id')
  public update(@Param() findOneInput: FindOneInput, @Body() updateBodyInput: UpdateInput): Promise<any> {
    return this.service.update(findOneInput, updateBodyInput);
  }

  @Delete(':id')
  public delete(@Param() findOneInput: FindOneInput): Promise<any> {
    return this.service.delete(findOneInput);
  }
}
