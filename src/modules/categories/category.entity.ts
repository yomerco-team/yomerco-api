import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SubCategory } from '../sub-categories/sub-category.entity';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @ApiProperty()
  @Column({ name: 'image_url', type: 'varchar', length: 100, nullable: true })
  imageUrl: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  @ApiProperty({ type: () => [SubCategory] })
  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories: SubCategory[];
}
