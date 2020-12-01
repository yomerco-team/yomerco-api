import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInput {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly uniqueCode: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
