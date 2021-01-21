import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { InventoryEntryDetail } from '../inventory-entry-details/inventory-entry-detail.entity';

import { ReferenceImage } from '../reference-images/reference-image.entity';
import { ReferencePrice } from '../reference-prices/reference-price.entity';
import { ReferenceInWharehouse } from '../references-in-wharehouses/reference-in-wharehouse.entity';
import { SubCategory } from '../sub-categories/sub-category.entity';

@Entity({ name: 'references' })
@Unique('uk_reference_unique_code', ['uniqueCode'])
export class Reference {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @ApiProperty()
    @Column({ name: 'unique_code', type: 'varchar', length: 50 })
    uniqueCode: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 200 })
    description: string;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiPropertyOptional()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // relations
    @ApiProperty({ type: () => [ReferenceImage] })
    @OneToMany(type => ReferenceImage, referenceImage => referenceImage.reference)
    referenceImages: ReferenceImage;

    @ApiProperty({ type: () => [ReferencePrice] })
    @OneToMany(type => ReferencePrice, referencePrice => referencePrice.reference)
    referencePrices: ReferencePrice;

    @ApiProperty({ type: () => SubCategory })
    @ManyToOne(type => SubCategory, subCategory => subCategory.references, { nullable: true })
    @JoinColumn({ name: 'sub_category_id' })
    subCategory: SubCategory;

    @ApiProperty({ type: () => [ReferenceInWharehouse] })
    @OneToMany(type => ReferenceInWharehouse, referenceInWharehouse => referenceInWharehouse.wharehouse)
    referencesInWharehouse: ReferenceInWharehouse[];

    @ApiProperty({ type: () => [InventoryEntryDetail] })
    @OneToMany(type => InventoryEntryDetail, inventoryEntryDetail => inventoryEntryDetail.buyReference)
    buyReferenceInventoryEntryDetails: InventoryEntryDetail[];
    
    @ApiProperty({ type: () => [InventoryEntryDetail] })
    @OneToMany(type => InventoryEntryDetail, inventoryEntryDetail => inventoryEntryDetail.sellReference)
    sellReferenceInventoryEntryDetails: InventoryEntryDetail[];
}