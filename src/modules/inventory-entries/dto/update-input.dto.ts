import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly proofUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly productProviderId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly wharehouseId?: number
}
