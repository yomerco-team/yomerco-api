import { IsBoolean, IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateAclUserInput {
  @IsEmail()
  readonly email: string;

  @Length(6, 16)
  @IsString()
  readonly password: string;

  @IsPhoneNumber('CO')
  readonly phone: string;

  @IsString()
  readonly roleCode: string;

  @IsBoolean()
  readonly anonymous: boolean;
}
