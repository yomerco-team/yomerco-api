import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reference } from './reference.entity';

import { CreateInput } from './dto/create-input.dto';

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

    if (!existing) {
      throw new PreconditionFailedException(`already exists a reference with uniqueCode ${uniqueCode}.`);
    }

    const { name, description, imageUrl } = createInput;

    const created = await this.referenceRepository.create({
      name,
      uniqueCode,
      description,
      imageUrl
    });

    const saved = await this.referenceRepository.save(created);

    return saved;
  }
}
