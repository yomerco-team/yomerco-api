import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from './location.entity';

import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsService],
  exports: [LocationsService]
})
export class LocationsModule {}
