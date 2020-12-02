import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindOneInput {
  @ApiPropertyOptional()
  @IsNumber()
  readonly id: number;
}
