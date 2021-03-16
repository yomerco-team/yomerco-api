import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.config.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommonModule } from './common/common.module';
import { ReferencesModule } from './modules/references/references.module';
import { ReferenceImagesModule } from './modules/reference-images/reference-images.module';
import { CountriesModule } from './modules/countries/countries.module';
import { StatesModule } from './modules/states/states.module';
import { CitiesModule } from './modules/cities/cities.module';
import { LocationsModule } from './modules/locations/locations.module';
import { WharehousesModule } from './modules/wharehouses/wharehouses.module';
import { ReferencePricesModule } from './modules/reference-prices/reference-prices.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubCategoriesModule } from './modules/sub-categories/sub-categories.module';
import { ParametersModule } from './modules/parameters/parameters.module';
import { ProductProvidersModule } from './modules/product-providers/product-providers.module';
import { ReferencesInWharehousesModule } from './modules/references-in-wharehouses/references-in-wharehouses.module';
import { InventoryEntriesModule } from './modules/inventory-entries/inventory-entries.module';
import { InventoryEntryDetailsModule } from './modules/inventory-entry-details/inventory-entry-details.module';
import { UserTypesModule } from './modules/user-types/user-types.module';
import { UsersModule } from './modules/users/users.module';

const NODE_ENV = process.env.NODE_ENV || 'local';
const envPath = path.resolve(__dirname, `../.env.${NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      load: [appConfig],
      validationSchema: appConfigSchema
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'local'
        // synchronize: false
      })
    }),
    CommonModule,
    ReferencesModule,
    ReferenceImagesModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    LocationsModule,
    WharehousesModule,
    ReferencePricesModule,
    CategoriesModule,
    SubCategoriesModule,
    ParametersModule,
    ProductProvidersModule,
    ReferencesInWharehousesModule,
    InventoryEntriesModule,
    InventoryEntryDetailsModule,
    UserTypesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
