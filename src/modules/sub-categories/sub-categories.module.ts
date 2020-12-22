import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from './sub-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubCategory])
  ],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService]
})
export class SubCategoriesModule {}
