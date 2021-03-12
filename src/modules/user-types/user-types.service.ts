import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserType } from './user-type.entity';

@Injectable()
export class UserTypesService {
  constructor (
    @InjectRepository(UserType)
    readonly userTypeRepository: Repository<UserType>
  ) {}
}
