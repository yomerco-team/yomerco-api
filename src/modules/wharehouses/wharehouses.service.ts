import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wharehouse } from './wharehouse.entity';

import { DefaultFindOneInput } from '../../common/dto/default-find-one-input.dto';

@Injectable()
export class WharehousesService {
  constructor(
    @InjectRepository(Wharehouse)
    private readonly wharehouseRepository: Repository<Wharehouse>
  ) {}

  
  /**
   *
   *
   * @param {FindOneInput} findOneInput
   * @return {*}  {(Promise<Wharehouse | null>)}
   * @memberof WharehousesService
   */
  public async findOne(findOneInput: DefaultFindOneInput): Promise<Wharehouse | null> {
    const { id } = findOneInput;

    const item = await this.wharehouseRepository.createQueryBuilder('w')
      .where('w.id = :id', { id })
      .getOne();

    return item || null;
  }
}
