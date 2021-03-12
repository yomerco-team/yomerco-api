import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Category } from '../categories/category.entity';
import { Reference } from '../references/reference.entity';

@Entity({ name: 'sub_categories' })
export class SubCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @ApiPropertyOptional()
  @Column({ name: 'image_url', type: 'varchar', length: 200, nullable: true })
  imageUrl: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, category => category.subCategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({ type: () => [Reference] })
  @OneToMany(() => Reference, reference => reference.subCategory)
  references: Reference[]
}