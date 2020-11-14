import { IsString } from 'class-validator';

export class UploadFileInput {
  @IsString()
  readonly bucketName: string;

  @IsString()
  readonly sourcePath: string;

  @IsString()
  readonly destinationPath: string;
}
