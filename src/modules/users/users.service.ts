import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

import { BasicAclService } from '../../common/integrations/basic-acl/basic-acl.service';
import { ParametersService } from '../parameters/parameters.service';

import { CreateUserInput } from './dto/create-user-input.dto';
@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly basicAclService: BasicAclService,
    private readonly parametersService: ParametersService
  ) {}

  public async create (createUserInput: CreateUserInput): Promise<User> {
    const { email } = createUserInput;

    const existingByEmail = await this.userRepository.createQueryBuilder('u')
      .where('u.email = :email', { email })
      .getOne();

    if (existingByEmail) {
      throw new PreconditionFailedException(`already exists a user with email ${email}.`);
    }

    const ACL_CUSTOMER_ROLE_CODE = await this.parametersService.getParameterValue({
      name: 'ACL_CUSTOMER_ROLE_CODE'
    });

    const aclUser = await this.basicAclService.createUser({
      anonymous: false,
      email: createUserInput.email,
      password: createUserInput.password,
      phone: createUserInput.phone,
      roleCode: ACL_CUSTOMER_ROLE_CODE
    });

    const created = this.userRepository.create({
      ...createUserInput,
      authUid: '' + aclUser.authUid
    });

    const saved = await this.userRepository.save(created);

    return saved;
  }
}
