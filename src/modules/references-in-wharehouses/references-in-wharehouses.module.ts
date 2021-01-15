import { Module } from '@nestjs/common';
import { ReferencesInWharehousesService } from './references-in-wharehouses.service';

@Module({
  providers: [ReferencesInWharehousesService]
})
export class ReferencesInWharehousesModule {}
