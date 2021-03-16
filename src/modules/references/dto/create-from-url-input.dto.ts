import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateFromUrlInput {
  @ApiProperty()
  @IsString()
  readonly referenceUniqueCode: string;

  @IsUrl()
  readonly url: string;
}
