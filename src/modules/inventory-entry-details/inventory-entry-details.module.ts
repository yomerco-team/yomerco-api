import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryEntryDetail } from './inventory-entry-detail.entity';

import { InventoryEntryDetailsService } from './inventory-entry-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntryDetail])
  ],
  providers: [InventoryEntryDetailsService],
  exports: [InventoryEntryDetailsService]
})
export class InventoryEntryDetailsModule {}
