import { IsString } from 'class-validator';

export class DeleteFileInput {
  @IsString()
  readonly bucketName: string;

  @IsString()
  readonly object: string;
}
