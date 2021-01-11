import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateInput {
  @IsOptional()
  @IsString()
  readonly nit?: string;

  @IsOptional()
  @IsString()
  readonly document?: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly address: string;

  @IsNumberString()
  readonly phone: string;
}