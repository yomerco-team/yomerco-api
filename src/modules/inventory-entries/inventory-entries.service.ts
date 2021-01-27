import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryEntry } from './inventory-entry.entity';

import { ProductProvidersService } from '../product-providers/product-providers.service';
import { WharehousesService } from '../wharehouses/wharehouses.service';

import { CreateInput } from './dto/create-input.dto';
@Injectable()
export class InventoryEntriesService {
  constructor(
    @InjectRepository(InventoryEntry)
    private readonly inventoryRepository: Repository<InventoryEntry>,
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

    const existingProductProvider = await this.productProvidersService.findOne({ id: productProviderId });

    if (!existingProductProvider) {
      throw new NotFoundException(`can't get the product provider with id: ${productProviderId}.`);
    }

    const { wharehouseId } = createInput;

    const existingWharehouse = await this.wharehousesService.findOne({ id: wharehouseId });

    if (!existingWharehouse) {
      throw new NotFoundException(`can't get the wharehouse with id: ${wharehouseId}.`);
    }

    const { description } = createInput;

    const created = this.inventoryRepository.create({
      description,
      productProvider: existingProductProvider,
      wharehouse: existingWharehouse
    });

    const saved = await this.inventoryRepository.save(created);

    return saved;
  }
}
