import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reference } from '../references/reference.entity';
import { Wharehouse } from '../wharehouses/wharehouse.entity';

@Entity({ name: 'references_in_wharehouses' })
export class ReferenceInWharehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  @ManyToOne(type => Wharehouse, wharehouse => wharehouse.referencesInWharehouse, { nullable: true })
  @JoinColumn({ name: 'wharehouse_id' })
  wharehouse: Wharehouse;

  @ManyToOne(type => Reference, reference => reference.referencesInWharehouse, { nullable: true })
  @JoinColumn({ name: 'reference_id' })
  reference: Reference;
}
