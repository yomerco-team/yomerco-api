import { IsString } from 'class-validator';

export class GetOneByNameInput {
  @IsString()
  readonly name: string;
}
