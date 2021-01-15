import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateInput {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly nit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly document?: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsNumberString()
  readonly phone: string;
}