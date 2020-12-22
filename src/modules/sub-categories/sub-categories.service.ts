import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubCategory } from './sub-category.entity';

import { GetByNameInput } from './dto/get-by-name-input.dto';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>
  ) {}

  /**
   *
   *
   * @param {GetByNameInput} getByNameInput
   * @return {*}  {Promise<SubCategory>}
   * @memberof SubCategoriesService
   */
  public async getByName(getByNameInput: GetByNameInput): Promise<SubCategory> {
    const { name } = getByNameInput;

    const subCategory = await this.subCategoryRepository.findOne({ where: { name } });

    if (!subCategory) return null;
    
    return subCategory;
  }
}
