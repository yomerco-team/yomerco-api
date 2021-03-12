import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { InventoryEntry } from '../inventory-entries/inventory-entry.entity';
import { Reference } from '../references/reference.entity';

@Entity({ name: 'inventory_entry_details' })
export class InventoryEntryDetail {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Reference, reference => reference.buyReferenceInventoryEntryDetails)
  @JoinColumn({ name: 'buy_reference_id' })
  buyReference: Reference;

  @Column({ name: 'buy_quantity', type: 'integer', nullable: true })
  buyQuantity: number;

  @Column({ name: 'buy_unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  buyUnitPrice: number;

  @Column({ name: 'buy_vat_tax', type: 'decimal', precision: 12, scale: 2, nullable: true })
  buyVatTax: number;

  @Column({ name: 'buy_consumption_tax', type: 'decimal', precision: 12, scale: 2, nullable: true })
  buyConsumtionTax: number;

  @Column({ name: 'buy_unit_price_with_taxes', type: 'decimal', precision: 12, scale: 2, nullable: true })
  buyUnitPriceWithTaxes: number;

  @Column({ name: 'buy_sub_total', type: 'decimal', precision: 12, scale: 2, nullable: true })
  buySubtotal: number;

  @Column({ name: 'buy_total', type: 'decimal', precision: 12, scale: 2, nullable: true })
  buyTotal: number;

  
  @ManyToOne(() => Reference, reference => reference.sellReferenceInventoryEntryDetails)
  @JoinColumn({ name: 'sell_reference_id' })
  sellReference: number;

  @Column({ name: 'sell_quantity', type: 'integer', nullable: true })
  sellQuantity: number;

  @Column({ name: 'sell_unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  sellUnitPrice: number;

  @Column({ name: 'sell_vat_tax', type: 'decimal', precision: 12, scale: 2, nullable: true })
  sellVatTax: number;

  @Column({ name: 'sell_consumption_tax', type: 'decimal', precision: 12, scale: 2, nullable: true })
  sellConsumtionTax: number;

  @Column({ name: 'sell_unit_price_with_taxes', type: 'decimal', precision: 12, scale: 2, nullable: true })
  sellUnitPriceWithTaxes: number;

  @Column({ name: 'sell_subtotal', type: 'decimal', precision: 12, scale: 2, nullable: true })
  sellSubtotal: number;

  @Column({ name: 'sell_total', type: 'decimal', precision: 12, scale: 2, nullable: true })
  sellTotal: number;

  @ManyToOne(() => InventoryEntry, inventoryEntry => inventoryEntry.details)
  @JoinColumn({ name: 'inventory_entry_id' })
  inventoryEntry: InventoryEntry;
}
