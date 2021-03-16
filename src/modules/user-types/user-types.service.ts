import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserType } from './user-type.entity';

import { GetByCodeInput } from './dto/get-by-code-input.dto';
@Injectable()
export class UserTypesService {
  constructor (
    @InjectRepository(UserType)
    readonly userTypeRepository: Repository<UserType>
  ) {}

  public async getByCode (getByCodeInput: GetByCodeInput): Promise<UserType> {
    const { code, checkExisting = false } = getByCodeInput;

    const item = await this.userTypeRepository.createQueryBuilder('ut')
      .where('ut.code = :code', { code })
      .getOne();

    if (!item && checkExisting) {
      throw new NotFoundException(`can't get the user type with code ${code}.`);
    }

    return item || null;
  }
}
