import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;
}
