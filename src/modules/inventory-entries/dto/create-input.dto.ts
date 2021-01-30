import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateInput {
  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  readonly productProviderId: number;

  @ApiProperty()
  @IsNumber()
  readonly wharehouseId: number
}