import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { InventoryEntry } from '../inventory-entries/inventory-entry.entity';
import { Location } from '../locations/location.entity';
import { ReferenceInWharehouse } from '../references-in-wharehouses/reference-in-wharehouse.entity';

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
  @ManyToOne(() => Location, location => location.wharehouses)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ApiProperty({ type: () => [ReferenceInWharehouse] })
  @OneToMany(() => ReferenceInWharehouse, referenceInWharehouse => referenceInWharehouse.wharehouse)
  referencesInWharehouse: ReferenceInWharehouse;

  @ApiProperty({ type: () => [InventoryEntry] })
  @OneToMany(() => InventoryEntry, inventoryEntry => inventoryEntry.wharehouse)
  inventoryEntries: InventoryEntry[];
}
