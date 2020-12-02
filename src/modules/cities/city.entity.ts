import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { State } from '../states/state.entity';
import { Location } from '../locations/location.entity';
import { ReferencePrice } from '../reference-prices/reference-price.entity';

@Entity({ name: 'cities' })
export class City {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  
  @ApiProperty({ type: () => State })
  @ManyToOne(type => State, state => state.cities)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToMany(type => Location, location => location.city)
  locations: Location[];

  @OneToMany(type => ReferencePrice, referencePrice => referencePrice.city)
  referencePrices: ReferencePrice[];
}
