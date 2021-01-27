import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryEntriesService } from './inventory-entries.service';
import { InventoryEntriesController } from './inventory-entries.controller';

import { InventoryEntry } from './inventory-entry.entity';

import { ProductProvidersModule } from '../product-providers/product-providers.module';
import { WharehousesModule } from '../wharehouses/wharehouses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntry]),
    ProductProvidersModule,
    WharehousesModule
  ],
  providers: [InventoryEntriesService],
  exports: [InventoryEntriesService],
  controllers: [InventoryEntriesController]
})
export class InventoryEntriesModule {}
