import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InventoryEntry } from '../inventory-entries/inventory-entry.entity';

@Entity({ name: 'product_providers' })
export class ProductProvider {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 20, nullable: true })
  nit?: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 20, nullable: true })
  document?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  address: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @ApiPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  @ApiProperty({ type: () => [InventoryEntry]})
  @OneToMany(() => InventoryEntry, inventoryEntry => inventoryEntry.productProvider)
  inventoryEntries: InventoryEntry[];
}
