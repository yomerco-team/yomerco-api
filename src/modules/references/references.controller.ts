import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReferencesService } from './references.service';

import { Reference } from './reference.entity';

import { CreateInput } from './dto/create-input.dto';

@ApiTags('references')
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
}
