import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { City } from '../cities/city.entity';
import { Reference } from '../references/reference.entity';

@Entity({ name: 'reference_prices' })
export class ReferencePrice {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'desired_margin_percentage', type: 'int' })
  desiredMarginPercentage: number;

  @ApiPropertyOptional()
  @Column({ name: 'avg_cost', type: 'decimal', precision: 12, scale: 2, nullable: true })
  avgCost: number;

  @ApiPropertyOptional()
  @Column({ name: 'avg_sell', type: 'decimal', precision: 12, scale: 2, nullable: true })
  avgSell: number;

  @ApiPropertyOptional()
  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  unitPrice: number;

  @ApiPropertyOptional()
  @Column({ name: 'vat_tax', type: 'decimal', precision: 12, scale: 2, nullable: true })
  vatTax: number;

  @ApiPropertyOptional()
  @Column({ name: 'consumption_tax', type: 'decimal', precision: 12, scale: 2, nullable: true })
  consumptionTax: number;

  @ApiPropertyOptional()
  @Column({ name: 'unit_price_with_taxes', type: 'decimal', precision: 12, scale: 2, nullable: true })
  unitPriceWithTaxes: number;

  @ApiPropertyOptional()
  @Column({ name: 'discount_value', type: 'decimal', precision: 12, scale: 2, nullable: true })
  discountValue: number;

  @ApiPropertyOptional()
  @Column({ name: 'discount_percentage', type: 'int', nullable: true })
  discountPercentage: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  @ManyToOne(() => City, city => city.referencePrices)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => Reference, reference => reference.referencePrices)
  @JoinColumn({ name: 'reference_id' })
  reference: Reference;
}