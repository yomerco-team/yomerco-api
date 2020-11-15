import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../cities/city.entity';

@Entity({ name: 'locations' })
export class Location {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326
  })
  coordinates: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  

  @ApiProperty({ type: () => City })
  @ManyToOne(type => City, city => city.locations)
  @JoinColumn({ name: 'city_id' })
  city: City;
}