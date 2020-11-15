import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { City } from './city.entity';

import { CitiesService } from './cities.service';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CitiesService],
  exports: [CitiesService]
})
export class CitiesModule {}
