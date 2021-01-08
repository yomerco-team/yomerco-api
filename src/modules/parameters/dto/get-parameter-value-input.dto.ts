import { IsString } from 'class-validator';

export class GetParameterValueInput {
  @IsString()
  name: string;
}