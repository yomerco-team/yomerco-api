import { ApiProperty  } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindOneInput {
  @ApiProperty()
  @IsNumber()
  readonly id: number;
}
