import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';

import { Reference } from './reference.entity';

import { ReferenceImagesModule } from '../reference-images/reference-images.module';
import { ReferencePricesModule } from '../reference-prices/reference-prices.module';
import { CitiesModule } from '../cities/cities.module';
import { SubCategoriesModule } from '../sub-categories/sub-categories.module';
import { ParametersModule } from '../parameters/parameters.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reference]),
    forwardRef(() => ReferenceImagesModule),
    ReferencePricesModule,
    CitiesModule,
    SubCategoriesModule,
    ParametersModule
  ],
  providers: [ReferencesService],
  controllers: [ReferencesController],
  exports: [ReferencesService]
})
export class ReferencesModule {}
