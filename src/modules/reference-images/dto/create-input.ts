import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInput {
  @ApiProperty()
  @IsString()
  readonly referenceUniqueCode: string;
}
