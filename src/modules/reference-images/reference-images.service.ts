import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import appConfig from '../../config/app.config';

import { StorageService } from 'src/common/storage/storage.service';
import { ReferenceImage } from './reference-image.entity';
import { ReferencesService } from '../references/references.service';

import { CreateInput } from './dto/create-input';

@Injectable()
export class ReferenceImagesService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly storageService: StorageService,
    @InjectRepository(ReferenceImage)
    private readonly referenceImageRepository: Repository<ReferenceImage>,
    private readonly referencesService: ReferencesService
  ) {}

  public async create(file: any, createInput: CreateInput): Promise<ReferenceImage> {
    let filePath = '';
    try {
      if (!file.mimetype.startsWith('image')) {
        throw new BadRequestException('mimetype not allowed.');
      }

      const { referenceUniqueCode } = createInput;

      const reference = await this.referencesService.findOne({ uniqueCode: referenceUniqueCode });

      if (!reference) {
        throw new NotFoundException(`can't get the reference with unique code ${referenceUniqueCode}.`);
      }
      
      // console.log('file', file);

      // console.log('createInput', createInput);
  
      const basePath = path.resolve(__dirname);
      const fileExt = file.originalname.split('.').pop();
  
      // console.log('basePath', basePath);
      // console.log('fileExt', fileExt);

      filePath = `${basePath}/${file.originalname}`;

      // console.log('filePath', filePath);
  
      fs.writeFileSync(`${basePath}/${file.originalname}`, file.buffer);

      const created = this.referenceImageRepository.create({
        url: 'pending',
        reference
      });

      const saved = await this.referenceImageRepository.save(created);

      const uploadedFile = await this.storageService.uploadFile({
        bucketName: this.appConfiguration.gcp.bucketName,
        sourcePath: filePath,
        destinationPath: `yomerco/reference-images/${referenceUniqueCode}-${saved.id}.${fileExt}`
      });

      const [makePublicResponse] = await uploadedFile.makePublic();

      const updated = await this.referenceImageRepository.save({
        ...saved,
        url: `${this.appConfiguration.gcp.bucketBaseUrl}${makePublicResponse.object}`
      });

      delete updated.reference;

      // console.log('updated', updated);
  
      return updated;  
    } catch (error) {
      throw error;
    } finally {
      if (filePath) fs.unlinkSync(filePath);
    }
  }
}
