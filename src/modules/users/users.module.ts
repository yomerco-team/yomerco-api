import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from './user.entity';

import { BasicAclModule } from '../../common/integrations/basic-acl/basic-acl.module';
import { ParametersModule } from '../parameters/parameters.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BasicAclModule,
    ParametersModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
