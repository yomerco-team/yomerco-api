import { ApiProperty  } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindOneInput {
  @ApiProperty()
  @IsString()
  readonly uniqueCode: string;
}
