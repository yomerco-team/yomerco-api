import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Wharehouse } from './wharehouse.entity';

import { WharehousesService } from './wharehouses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wharehouse])],
  providers: [WharehousesService],
  exports: [WharehousesService]
})
export class WharehousesModule {}
