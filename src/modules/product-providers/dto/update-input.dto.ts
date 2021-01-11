import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateInput {
  @IsOptional()
  @IsString()
  readonly nit?: string;

  @IsOptional()
  @IsString()
  readonly document?: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsNumberString()
  readonly phone: string;
}
