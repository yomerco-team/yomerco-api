import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencePrice } from './reference-price.entity';
import { ReferencePricesService } from './reference-prices.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferencePrice])
  ],
  providers: [ReferencePricesService],
  exports: [ReferencePricesService]
})
export class ReferencePricesModule {}
