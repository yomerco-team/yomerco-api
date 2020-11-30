import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Location } from '../locations/location.entity';

@Entity({ name: 'wharehouses' })
@Unique('uk_wharehouses_code', ['code'])
export class Wharehouse {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 5 })
  code: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  address: string;


  // relations
  @ApiProperty({ type: () => Location })
  @ManyToOne(type => Location, location => location.wharehouses)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}