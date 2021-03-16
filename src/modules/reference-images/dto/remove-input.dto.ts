import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class RemoveInput {
  @ApiProperty()
  @IsString()
  readonly referenceUniqueCode: string;

  @ApiProperty()
  @IsNumberString()
  readonly id: number;
}
