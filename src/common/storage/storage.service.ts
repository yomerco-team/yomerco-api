import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { File, Storage } from '@google-cloud/storage';
import { ConfigType } from '@nestjs/config';

import appConfig from '../../config/app.config';
import { UploadFileInput } from './dto/upload-file-input.dto';
import { DeleteFileInput } from './dto/delete-file-input.dto';

@Injectable()
export class StorageService {
  private readonly storage: Storage;

  constructor (
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>
  ) {
    this.storage = new Storage({
      projectId: this.appConfiguration.gcp.projectId,
      credentials: {
        client_email: this.appConfiguration.gcp.clientEmail,
        private_key: this.appConfiguration.gcp.privateKey
      }
    });
  }

  public async uploadFile (uploadFileInput: UploadFileInput): Promise<File> {
    const { bucketName, destinationPath, sourcePath } = uploadFileInput;

    const options = {
      destination: destinationPath,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        // cacheControl: 'public, max-age=31536000'
        cacheControl: 'no-cache'
      }
    };

    const [response] = await this.storage
      .bucket(bucketName)
      .upload(sourcePath, options);

    return response;
  }

  /**
   *
   *
   * @param {DeleteFileInput} deleteFileInput
   * @memberof StorageService
   */
  public async deleteFile (deleteFileInput: DeleteFileInput): Promise<void> {
    const { bucketName, object } = deleteFileInput;

    try {
      await this.storage
        .bucket(bucketName)
        .file(object)
        .delete();

      Logger.debug(`file ${object} deleted!`);
    } catch (error) {
      console.error(error);
      if (error.code !== HttpStatus.NOT_FOUND) {
        throw error;
      }
    }
  }
}
