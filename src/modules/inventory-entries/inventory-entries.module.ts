import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntriesService } from './inventory-entries.service';
import { InventoryEntry } from './inventory-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntry])
  ],
  providers: [InventoryEntriesService],
  exports: [InventoryEntriesService]
})
export class InventoryEntriesModule {}
