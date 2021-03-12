import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../cities/city.entity';
import { Country } from '../countries/country.entity';

@Entity({ name: 'states' })
export class State {
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

  @ApiProperty({ type: () => Country })
  @ManyToOne(() => Country, country => country.states)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => City, city => city.state)
  cities: City[];
}
