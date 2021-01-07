import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Parameter } from './parameter.entity';

import { ParametersService } from './parameters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parameter])
  ],
  providers: [ParametersService],
  exports: [ParametersService]
})
export class ParametersModule {}
