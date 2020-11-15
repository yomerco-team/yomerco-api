import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { State } from './state.entity';

import { StatesService } from './states.service';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesService],
  exports: [StatesService]
})
export class StatesModule {}
