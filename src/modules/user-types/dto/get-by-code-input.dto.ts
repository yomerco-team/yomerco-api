import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GetByCodeInput {
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsBoolean()
  readonly checkExisting?: boolean;
}
