import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { State } from '../states/state.entity';

@Entity({ name: 'countries' })
@Unique('uk_countries_country_iso_code', ['countryISOCode'])
export class Country {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'country_iso_code', type: 'varchar', length: 5 })
  countryISOCode: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  @OneToMany(type => State, state => state.country)
  states: State[];

}
