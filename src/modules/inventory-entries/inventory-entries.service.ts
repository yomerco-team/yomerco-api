import * as fs from 'fs';
import * as path from 'path';
import { v2 as cloudinary }  from 'cloudinary';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryEntry } from './inventory-entry.entity';

import { ProductProvidersService } from '../product-providers/product-providers.service';
import { WharehousesService } from '../wharehouses/wharehouses.service';

import { UploadFile } from '../../common/interfaces/upload-file.int';

import { CreateInput } from './dto/create-input.dto';
import { UpdateInput } from './dto/update-input.dto';
import { DefaultFindOneInput } from 'src/common/dto/default-find-one-input.dto';
import { ListInput } from './dto/list-input.dto';
@Injectable()
export class InventoryEntriesService {
  constructor(
    @InjectRepository(InventoryEntry)
    private readonly inventoryEntryRepository: Repository<InventoryEntry>,
    private readonly productProvidersService: ProductProvidersService,
    private readonly wharehousesService: WharehousesService
  ){}

  /**
   *
   *
   * @param {CreateInput} createInput
   * @return {*}  {Promise<InventoryEntry>}
   * @memberof InventoryEntriesService
   */
  public async create(createInput: CreateInput): Promise<InventoryEntry> {
    const { productProviderId } = createInput;

    const existingProductProvider = await this.productProvidersService.findOne({ id: '' + productProviderId });

    if (!existingProductProvider) {
      throw new NotFoundException(`can't get the product provider with id: ${productProviderId}.`);
    }

    const { wharehouseId } = createInput;

    const existingWharehouse = await this.wharehousesService.findOne({ id: '' + wharehouseId });

    if (!existingWharehouse) {
      throw new NotFoundException(`can't get the wharehouse with id: ${wharehouseId}.`);
    }

    const { description } = createInput;

    const created = this.inventoryEntryRepository.create({
      description,
      productProvider: existingProductProvider,
      wharehouse: existingWharehouse
    });

    const saved = await this.inventoryEntryRepository.save(created);

    delete saved.productProvider;
    delete saved.wharehouse;

    return saved;
  }

  /**
   *
   *
   * @param {FindOneInput} findOneInput
   * @return {*}  {Promise<InventoryEntry>}
   * @memberof InventoryEntriesService
   */
  public async findOne(findOneInput: DefaultFindOneInput): Promise<InventoryEntry> {
    const { id } = findOneInput;

    const item = await this.inventoryEntryRepository.createQueryBuilder('ie')
      .where('ie.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async list(listInput: ListInput): Promise<InventoryEntry[]> {
    const { limit = 10, offset = 0, search = '' } = listInput;

    const query = this.inventoryEntryRepository.createQueryBuilder('ie')
      .innerJoinAndSelect('ie.productProvider', 'pp')
      .innerJoinAndSelect('ie.wharehouse', 'w');

    if (search) {
      query.where('ie.description like :search', { search: `%${search}%` })
        .orWhere('pp.email like :search', { search: `%${search}%` })
        .orWhere('w.name like :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .skip(offset);

    const items = await query.getMany();

    return items;
  }

  public async update(findOneInput: DefaultFindOneInput, updateInput: UpdateInput): Promise<InventoryEntry> {
    const existing = await this.findOne(findOneInput);

    if (!existing) {
      throw new NotFoundException(`can't get the inventory entry with id ${findOneInput.id}.`);
    }

    let existingProductProvider;    
    if (updateInput.productProviderId) {
      const { productProviderId } = updateInput;

      existingProductProvider = await this.productProvidersService.findOne({ id: '' + productProviderId });
      if (!existingProductProvider) {
        throw new NotFoundException(`can't get the product provider with id: ${productProviderId}.`);
      }
    }

    let existingWharehouse;
    if (updateInput.wharehouseId) {
      const { wharehouseId } = updateInput;

      existingWharehouse = await this.wharehousesService.findOne({ id: '' + wharehouseId });
      if (!existingWharehouse) {
        throw new NotFoundException(`can't get the wharehouse with id: ${wharehouseId}.`);
      }
    }

    const preloaded = await this.inventoryEntryRepository.preload({
      id: existing.id,
      ...updateInput,
      productProvider: existingProductProvider
    });

    const saved = await this.inventoryEntryRepository.save(preloaded);

    return saved;
  }

  public async delete(findOneInput: DefaultFindOneInput): Promise<InventoryEntry> {
    const existing = await this.findOne(findOneInput);

    if (!existing) {
      throw new NotFoundException(`can't get the inventory entry with id ${findOneInput.id}.`);
    }

    const removed = await this.inventoryEntryRepository.remove(existing);

    delete removed.wharehouse;
    delete removed.productProvider;

    return removed;
  }

  /**
   *
   *
   * @param {*} file
   * @param {DefaultFindOneInput} uploadProofInput
   * @return {*} 
   * @memberof InventoryEntriesService
   */
  public async uploadProof(file: UploadFile, uploadProofInput: DefaultFindOneInput): Promise<InventoryEntry> {
    let filePath = '';

    try {
      if (!file) {
        throw new BadRequestException('file is required.');
      }

      if (!file.mimetype.startsWith('image')) {
        throw new BadRequestException('mimetype not allowed.');
      }

      const existingInventoryEntry = await this.findOne({ id: uploadProofInput.id });

      if (!existingInventoryEntry) {
        throw new NotFoundException(`can't get the inventory entry with id ${uploadProofInput.id}`);
      }

      const basePath = path.resolve(__dirname);

      filePath = `${basePath}/${file.originalname}`;

      fs.writeFileSync(filePath, file.buffer);

      const cloudinaryResponse = await cloudinary.uploader.upload(filePath);

      const { secure_url: secureUrl } = cloudinaryResponse;

      const updated = await this.update(
        {
          id: '' + existingInventoryEntry.id
        },
        {
          proofUrl: secureUrl
        }
      );

      delete updated.productProvider;
      delete updated.wharehouse;

      return updated;
    } catch (error) {
      throw error;
    } finally {
      if (filePath) fs.unlinkSync(filePath);
    }
  }
}
