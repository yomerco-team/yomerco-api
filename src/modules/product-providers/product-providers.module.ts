import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProvidersService } from './product-providers.service';
import { ProductProvidersController } from './product-providers.controller';
import { ProductProvider } from './product-provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductProvider])
  ],
  providers: [ProductProvidersService],
  controllers: [ProductProvidersController],
  exports: [ProductProvidersService]
})
export class ProductProvidersModule {}
