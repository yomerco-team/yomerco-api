import * as fs from 'fs';
import * as path from 'path';
import { v2 as cloudinary }  from 'cloudinary';
import { BadRequestException, forwardRef, HttpService, Inject, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import appConfig from '../../config/app.config';

import { StorageService } from 'src/common/storage/storage.service';
import { ReferenceImage } from './reference-image.entity';
import { ReferencesService } from '../references/references.service';

import { CreateInput } from './dto/create-input';
import { RemoveInput } from './dto/remove-input.dto';
import { CreateFromUrlInput } from '../references/dto/create-from-url-input.dto';
@Injectable()
export class ReferenceImagesService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly storageService: StorageService,
    @InjectRepository(ReferenceImage)
    private readonly referenceImageRepository: Repository<ReferenceImage>,
    @Inject(forwardRef(() => ReferencesService))
    private readonly referencesService: ReferencesService,
    private readonly httpService: HttpService
  ) {
    cloudinary.config({
      cloud_name: this.appConfiguration.cloudinary.cloudName,
      api_key: this.appConfiguration.cloudinary.apiKey,
      api_secret: this.appConfiguration.cloudinary.apiSecret
    });
  }

  /**
   *
   *
   * @param {*} file
   * @param {CreateInput} createInput
   * @return {*}  {Promise<ReferenceImage>}
   * @memberof ReferenceImagesService
   */
  public async create(file: any, createInput: CreateInput): Promise<ReferenceImage[]> {
    let filePath = '';
    try {
      if (!file) {
        throw new BadRequestException('file is required.');
      }

      if (!file.mimetype.startsWith('image')) {
        throw new BadRequestException('mimetype not allowed.');
      }

      const { referenceUniqueCode } = createInput;

      const reference = await this.referencesService.findOne({ uniqueCode: referenceUniqueCode });

      if (!reference) {
        throw new NotFoundException(`can't get the reference with unique code ${referenceUniqueCode}.`);
      }

      const referenceImagesNumber = await this.referenceImageRepository.count({ where: { reference }});

      if (referenceImagesNumber >= 9) {
        throw new PreconditionFailedException(`the reference has ${referenceImagesNumber} images.`);
      }
      
      // console.log('file', file);

      // console.log('createInput', createInput);
  
      const basePath = path.resolve(__dirname);
      // const fileExt = file.originalname.split('.').pop();
  
      // console.log('basePath', basePath);
      // console.log('fileExt', fileExt);

      filePath = `${basePath}/${file.originalname}`;

      // console.log('filePath', filePath);
  
      fs.writeFileSync(filePath, file.buffer);

      const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
        eager: [
          { width: 150, height: 150 },
          { width: 300, height: 300 },
          { width: 600, height: 600 }
        ]
      });

      const { public_id, eager } = cloudinaryResponse;
      
      let createdReferenceImages: ReferenceImage[] = [];

      for (const item of eager) {
        let size: string;

        switch (item.width) {
        case 150:
          size = 'small';
          break;
        case 300:
          size = 'medium';
          break;
        case 600:
          size = 'large';
          break;
        default:
          size = null;
          break;
        }

        const created = this.referenceImageRepository.create({
          cloudId: public_id,
          url: item.secure_url,
          size,
          reference
        });
  
        const saved = await this.referenceImageRepository.save(created);

        createdReferenceImages = [...createdReferenceImages, saved];
      }
  
      return createdReferenceImages;  
    } catch (error) {
      throw error;
    } finally {
      if (filePath) fs.unlinkSync(filePath);
    }
  }

  /**
   *
   *
   * @param {RemoveInput} removeInput
   * @return {*}  {Promise<ReferenceImage>}
   * @memberof ReferenceImagesService
   */
  public async remove(removeInput: RemoveInput): Promise<any> {
    const { id, referenceUniqueCode } = removeInput;

    const reference = await this.referencesService.findOne({ uniqueCode: referenceUniqueCode });

    if (!reference) {
      throw new NotFoundException(`can't get the reference with unique code ${referenceUniqueCode}.`);
    }

    const referenceImage = await this.referenceImageRepository.findOne(id, { where: { reference } });

    if (!referenceImage) {
      throw new NotFoundException(`can't get the reference image with id ${id}.`);
    }

    const { cloudId } = referenceImage;

    if (cloudId) {
      await this.referenceImageRepository.delete({ cloudId });
    } else {
      await this.referenceImageRepository.remove(referenceImage);
    }

    return {
      message: 'ok'
    };
  }

  public async createFromUrl(createFromUrlInput: CreateFromUrlInput): Promise<ReferenceImage[]> {
    const { url, referenceUniqueCode } = createFromUrlInput;

    const result = await this.httpService.axiosRef({
      url,
      responseType: 'arraybuffer'
    });

    const buffer = result.data;
    const mimetype = result.headers['content-type'];
    const originalname = `${referenceUniqueCode}.${mimetype.split('/')[1]}`;

    const file = {
      buffer,
      mimetype,
      originalname
    };

    const createdReferenceImages = await this.create(file, { referenceUniqueCode });

    return createdReferenceImages;
  }
}
