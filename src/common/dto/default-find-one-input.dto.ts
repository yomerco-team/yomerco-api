import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DefaultFindOneInput {
  @ApiProperty()
  @IsNumber()
  id: number;
}