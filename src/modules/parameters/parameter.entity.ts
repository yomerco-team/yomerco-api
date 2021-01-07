import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'parameters' })
export class Parameter {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 200, nullable: true })
  description?: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
