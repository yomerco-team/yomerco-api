import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { ReferenceImage } from '../reference-images/reference-image.entity';

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

    @ApiPropertyOptional()
    @Column({ type: 'varchar', length: 200, nullable: true })
    imageUrl?: string;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // relations
    @ApiProperty({ type: () => [ReferenceImage] })
    @OneToMany(type => ReferenceImage, referenceImage => referenceImage.reference)
    referenceImages: ReferenceImage;
}