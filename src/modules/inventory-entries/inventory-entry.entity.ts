import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InventoryEntryDetail } from '../inventory-entry-details/inventory-entry-detail.entity';
import { ProductProvider } from '../product-providers/product-provider.entity';
import { Wharehouse } from '../wharehouses/wharehouse.entity';

@Entity({ name: 'inventory_entries' })
export class InventoryEntry {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Column({ name: 'description', type: 'varchar', length: 200, nullable: true })
  description?: string;

  @ApiPropertyOptional()
  @Column({ name: 'proof_url', type: 'varchar', length: 200, nullable: true })
  proofUrl?: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @ApiPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  @ApiProperty({ type: () => ProductProvider })
  @ManyToOne(type => ProductProvider, productProvider => productProvider.inventoryEntries)
  @JoinColumn({ name: 'product_provider_id' })
  productProvider: ProductProvider;

  @ApiProperty({ type: () => Wharehouse })
  @ManyToOne(type => Wharehouse, wharehouse => wharehouse.inventoryEntries)
  @JoinColumn({ name: 'wharehouse_id' })
  wharehouse: Wharehouse;

  @ApiProperty({ type: () => [InventoryEntryDetail] })
  @OneToMany(type => InventoryEntryDetail, inventoryEntryDetail => inventoryEntryDetail.inventoryEntry)
  details: InventoryEntryDetail[];
}