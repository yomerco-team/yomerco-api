import { IsString } from 'class-validator';

export class GetByNameInput {
  @IsString()
  readonly name: string;
}
