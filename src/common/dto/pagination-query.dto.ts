import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  offset: number;
}
