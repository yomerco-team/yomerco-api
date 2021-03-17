import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';

import { UsersService } from './users.service';

import { CreateUserInput } from './dto/create-user-input.dto';
@ApiTags('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('users')
export class UsersController {
  constructor (readonly service: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'reponse',
    type: User
  })
  @Post()
  create (@Body() createInput: CreateUserInput): Promise<User> {
    return this.service.create(createInput);
  }
}
