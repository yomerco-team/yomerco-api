import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductProvider } from './product-provider.entity';

import { CreateInput } from './dto/create-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { UpdateInput } from './dto/update-input.dto';
import { DefaultFindOneInput } from '../../common/dto/default-find-one-input.dto';

@Injectable()
export class ProductProvidersService {
  constructor (
    @InjectRepository(ProductProvider)
    private readonly productProviderRepository: Repository<ProductProvider>
  ) {}

  /**
   *
   *
   * @param {CreateInput} createInput
   * @return {*}  {Promise<ProductProvider>}
   * @memberof ProductProvidersService
   */
  public async create (createInput: CreateInput): Promise<ProductProvider> {
    const created = this.productProviderRepository.create({
      address: createInput.address,
      document: createInput.document,
      email: createInput.email,
      nit: createInput.nit,
      phone: createInput.phone
    });

    const saved = await this.productProviderRepository.save(created);

    return saved;
  }

  /**
   *
   *
   * @param {FindAllInput} listInput
   * @return {*}  {Promise<ProductProvider[]>}
   * @memberof ProductProvidersService
   */
  public async list (listInput: FindAllInput): Promise<ProductProvider[]> {
    const { limit = 0, offset = 0 } = listInput;

    const items = await this.productProviderRepository.createQueryBuilder('pp')
      .limit(limit || undefined)
      .skip(offset)
      .getMany();

    return items;
  }

  /**
   *
   *
   * @param {FindOneInput} findOneInput
   * @return {*}  {(Promise<ProductProvider | null>)}
   * @memberof ProductProvidersService
   */
  public async findOne (findOneInput: DefaultFindOneInput): Promise<ProductProvider | null> {
    const { id } = findOneInput;

    const item = await this.productProviderRepository.createQueryBuilder('pp')
      .where('pp.id = :id', { id })
      .getOne();

    return item || null;
  }

  /**
   *
   *
   * @param {FindOneInput} findOneInput
   * @param {UpdateInput} updateBodyInput
   * @return {*}  {Promise<ProductProvider>}
   * @memberof ProductProvidersService
   */
  public async update (findOneInput: DefaultFindOneInput, updateBodyInput: UpdateInput): Promise<ProductProvider> {
    const existing = await this.findOne(findOneInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product provider with id ${findOneInput.id}.`);
    }

    const preloaded = await this.productProviderRepository.preload({
      id: existing.id,
      ...updateBodyInput
    });

    const saved = await this.productProviderRepository.save(preloaded);

    return saved;
  }

  public async delete (findOneInput: DefaultFindOneInput): Promise<ProductProvider> {
    const item = await this.findOne(findOneInput);

    if (!item) {
      throw new NotFoundException(`can't get the product provider with id ${findOneInput.id}.`);
    }

    const deleted = await this.productProviderRepository.remove(item);

    return deleted;
  }
}
