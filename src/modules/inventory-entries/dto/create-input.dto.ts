import { IsNumber, IsString } from 'class-validator';

export class CreateInput {
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly productProviderId: number;

  @IsNumber()
  readonly wharehouseId: number
}