import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './user-type.entity';
import { UserTypesService } from './user-types.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserType
    ])
  ],
  providers: [UserTypesService],
  exports: [UserTypesService]
})
export class UserTypesModule {}
