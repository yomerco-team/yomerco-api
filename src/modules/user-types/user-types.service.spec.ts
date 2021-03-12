import { Test, TestingModule } from '@nestjs/testing';
import { UserTypesService } from './user-types.service';

describe('UserTypesService', () => {
  let service: UserTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTypesService]
    }).compile();

    service = module.get<UserTypesService>(UserTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
