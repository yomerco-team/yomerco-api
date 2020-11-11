import { IsString } from 'class-validator';

export class CreateInput {
  @IsString()
  readonly referenceUniqueCode: string;
}
