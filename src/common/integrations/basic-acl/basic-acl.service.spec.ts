import { Test, TestingModule } from '@nestjs/testing';
import { BasicAclService } from './basic-acl.service';

describe('BasicAclService', () => {
  let service: BasicAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicAclService]
    }).compile();

    service = module.get<BasicAclService>(BasicAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
