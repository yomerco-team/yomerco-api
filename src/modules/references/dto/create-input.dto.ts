import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsNumber()
  readonly cityId: number;

  @ApiProperty()
  @IsNumber()
  readonly desiredMarginPercentage: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly discountValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly discountPercentage?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly subCategoryName?: string;
}
