import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntry } from './inventory-entry.entity';

@Injectable()
export class InventoryEntriesService {
  constructor(
    @InjectRepository(InventoryEntry)
    private readonly inventoryRepository: Repository<InventoryEntry>
  ){}
}
