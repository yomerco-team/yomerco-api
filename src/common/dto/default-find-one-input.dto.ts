import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DefaultFindOneInput {
  @ApiProperty()
  @IsNumberString()
  id: string;
}