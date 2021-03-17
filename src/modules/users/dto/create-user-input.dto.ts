import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserInput {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 16)
  readonly password: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  readonly fullName: string;

  @ApiProperty()
  @IsPhoneNumber('CO')
  readonly phone: string;
}
