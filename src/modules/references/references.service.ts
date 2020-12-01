import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reference } from './reference.entity';

import { CreateInput } from './dto/create-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { FindOneInput } from './dto/find-one-input.dto';
import { UpdateInput } from './dto/update-input.dto';

@Injectable()
export class ReferencesService {
  constructor(
        @InjectRepository(Reference)
        private readonly referenceRepository: Repository<Reference>
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

    const existing = await this.referenceRepository
      .createQueryBuilder('r')
      .where('r.uniqueCode = :uniqueCode', { uniqueCode })
      .getOne();

    if (existing) {
      throw new PreconditionFailedException(`already exists a reference with uniqueCode ${uniqueCode}.`);
    }

    const { name, description } = createInput;

    const created = await this.referenceRepository.create({
      name,
      uniqueCode,
      description
    });

    const saved = await this.referenceRepository.save(created);

    return saved;
  }

  /**
   *
   *
   * @param {FindAllInput} findAllInput
   * @return {*}  {Promise<Reference[]>}
   * @memberof ReferencesService
   */
  public async findAll(findAllInput: FindAllInput): Promise<Reference[]> {
    const { limit = 10, offset = 0 } = findAllInput;

    const query = this.referenceRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.referenceImages', 'ri')
      .limit(limit || undefined)
      .skip(offset)
      .orderBy('r.id', 'DESC');

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

  public async uploadReferences(file: any) {
    // console.log('buffer', file.buffer.toString('utf-8'));

    return {
      message: 'ok'
    };
  }
}
