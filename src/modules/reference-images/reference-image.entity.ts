import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reference } from '../references/reference.entity';

@Entity({ name: 'reference_images' })
export class ReferenceImage {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  url: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  size: string;

  @ApiProperty()
  @Column({ name: 'cloud_id', type: 'varchar', length: 20, nullable: true })
  cloudId: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  @ApiProperty({ type: () => Reference })
  @ManyToOne(() => Reference, reference => reference.referenceImages)
  @JoinColumn({ name: 'reference_id' })
  reference: Reference;
}