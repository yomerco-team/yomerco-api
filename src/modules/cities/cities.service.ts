import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from './city.entity';

import { FindOneInput } from './dto/find-one-input.dto';
import { GetOneByNameInput } from './dto/get-one-by-name-input.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  public async findOne(findOneInput: FindOneInput): Promise<City | null> {
    const { id } = findOneInput;

    const city = await this.cityRepository.findOne(id);

    return city || null;
  }

  public async getOneByName(getOneByNameInput: GetOneByNameInput): Promise<City | null> {
    const { name } = getOneByNameInput;

    const city = await this.cityRepository.createQueryBuilder('c')
      .where('c.name = :=name', { name })
      .getOne();

    return city || null;
  }
}
