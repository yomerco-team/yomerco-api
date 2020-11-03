import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindOneInput {
  @ApiProperty()
  @IsNumberString()
  id: string;
}
