import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReferenceInWharehouse } from './reference-in-wharehouse.entity';
import { ReferencesInWharehousesService } from './references-in-wharehouses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenceInWharehouse])],
  providers: [ReferencesInWharehousesService],
  exports: [ReferencesInWharehousesService]
})
export class ReferencesInWharehousesModule {}
