import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reference } from './reference.entity';

import { ReferenceImagesService } from '../reference-images/reference-images.service';
import { ReferencePricesService } from '../reference-prices/reference-prices.service';

import { CreateInput } from './dto/create-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { FindOneInput } from './dto/find-one-input.dto';
import { UpdateInput } from './dto/update-input.dto';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class ReferencesService {
  constructor(
        @InjectRepository(Reference)
        private readonly referenceRepository: Repository<Reference>,
        @Inject(forwardRef(() => ReferenceImagesService))
        private readonly referenceImagesService: ReferenceImagesService,
        private readonly referencePricesService: ReferencePricesService,
        private readonly citiesService: CitiesService
  ) {}

  /**
   *
   *
   * @param {CreateInput} createInput
   * @return {*}  {Promise<Reference>}
   * @memberof ReferencesService
   */
  public async create(createInput: CreateInput): Promise<Reference> {
    const { uniqueCode } = createInput;

    // check the existing reference
    const existing = await this.referenceRepository
      .createQueryBuilder('r')
      .where('r.uniqueCode = :uniqueCode', { uniqueCode })
      .getOne();

    if (existing) {
      throw new PreconditionFailedException(`already exists a reference with uniqueCode ${uniqueCode}.`);
    }

    const { cityId } = createInput;

    // check the city
    const city = await this.citiesService.findOne({ id: cityId });

    if (!city) {
      throw new NotFoundException(`can't get the city with id ${cityId}.`);
    }

    const { name, description } = createInput;

    const createdReference = await this.referenceRepository.create({
      name,
      uniqueCode,
      description
    });

    const savedReference = await this.referenceRepository.save(createdReference);

    const {
      desiredMarginPercentage,
      discountPercentage,
      discountValue
    } = createInput;

    await this.referencePricesService.createFromReference({
      city,
      reference: savedReference,
      desiredMarginPercentage,
      discountPercentage,
      discountValue
    });

    const referenceForResult = await this.referenceRepository.findOne(
      savedReference.id,
      {
        relations: ['referenceImages', 'referencePrices']
      }
    );


    return referenceForResult;
  }

  /**
   *
   *
   * @param {FindAllInput} findAllInput
   * @return {*}  {Promise<Reference[]>}
   * @memberof ReferencesService
   */
  public async findAll(findAllInput: FindAllInput): Promise<Reference[]> {
    const { limit = 10, offset = 0, cityId } = findAllInput;

    let query = this.referenceRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.referenceImages', 'ri')
      .leftJoinAndSelect('r.referencePrices', 'rp');

    if (cityId) {
      query = query.where('rp.city_id = :cityId', { cityId });
    }
    
    query = query.limit(limit || undefined)
      .skip(offset)
      .orderBy('r.id', 'DESC');

    // const sql = query.getSql();

    // console.log('sql', sql);

    const data = await query.getMany();

    return data;    
  }

  /**
   *
   *
   * @param {FindOneInput} findOneInput
   * @return {*}  {Promise<Reference>}
   * @memberof ReferencesService
   */
  public async findOne(findOneInput: FindOneInput): Promise<Reference> {
    const { uniqueCode } = findOneInput;

    const existing = await this.referenceRepository.createQueryBuilder('r')
      .where('r.uniqueCode = :uniqueCode', { uniqueCode })
      .getOne();

    return existing || null;
  }

  /**
   *
   *
   * @param {FindOneInput} findOneInput
   * @param {UpdateInput} updateInput
   * @return {*}  {Promise<Reference>}
   * @memberof ReferencesService
   */
  public async update(findOneInput: FindOneInput, updateInput: UpdateInput): Promise<Reference> {
    const { uniqueCode } = findOneInput;

    const existing = await this.findOne({ uniqueCode });

    if (!existing) {
      throw new NotFoundException(`can't get the reference with unique code ${uniqueCode}.`);
    }

    const { id } = existing;

    const preloaded = await this.referenceRepository.preload({
      id,
      ...updateInput
    });

    const compareTo = await this.findOne({ uniqueCode: preloaded.uniqueCode });

    if (compareTo.id !== preloaded.id) {
      throw new PreconditionFailedException(`already exists a reference with code ${preloaded.uniqueCode}.`);
    }

    const saved = await this.referenceRepository.save(preloaded);

    return saved;
  }

  public async uploadReferences(file: any): Promise<any> {
    const fileContent: string = file.buffer.toString('utf-8');

    let lines = fileContent.split('\r\n');

    if (lines.length <= 1) {
      lines = fileContent.split('\n');
    }

    if (lines.length <= 1) {
      throw new BadRequestException('empty file.');
    }

    lines = lines.slice(1);

    for (const line of lines) {
      const array = line.split(';');

      const uniqueCode = array[0];
      const name = array[1];
      const description = array[2];
      const cityName = array[3];
      const desiredMarginPercentage = array[4] ? parseInt(array[4], 10) : 0;
      const discountValue = array[5] ? parseFloat(array[5]) : null;
      const discountPercentage = array[6] ? parseInt(array[6], 10) : null;
      const imageOne = array[3];
      const imageTwo = array[4];
      const imageThree = array[5];

      if (!uniqueCode || !name) {
        // TODO: keep the error
        continue;
      }

      const city = await this.citiesService.getOneByName({ name: cityName });

      if (!city) {
        // TODO: keep the error
        continue;
      }

      let reference = await this.findOne({ uniqueCode });

      if (!reference) {
        reference = await this.create({
          cityId: 1,
          description,
          desiredMarginPercentage,
          name,
          uniqueCode,
          discountPercentage,
          discountValue
        });
      }

      // console.log('reference', reference);

      if (imageOne) {
        await this.referenceImagesService.createFromUrl({
          referenceUniqueCode: reference.uniqueCode,
          url: imageOne
        });
      }

      if (imageTwo) {
        await this.referenceImagesService.createFromUrl({
          referenceUniqueCode: reference.uniqueCode,
          url: imageTwo
        });
      }

      if (imageThree) {
        await this.referenceImagesService.createFromUrl({
          referenceUniqueCode: reference.uniqueCode,
          url: imageThree
        });
      }
    }

    return {
      message: 'ok'
    };
  }
}
