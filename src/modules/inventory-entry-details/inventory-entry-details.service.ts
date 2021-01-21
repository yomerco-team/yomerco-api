import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryEntryDetail } from './inventory-entry-detail.entity';

@Injectable()
export class InventoryEntryDetailsService {
  constructor(
    @InjectRepository(InventoryEntryDetail)
    private readonly inventoryEntryDetailRepository: Repository<InventoryEntryDetail>
  ) {}
}
