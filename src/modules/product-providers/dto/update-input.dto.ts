import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly nit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly document?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly phone: string;
}
