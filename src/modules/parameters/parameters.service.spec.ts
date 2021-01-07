import { Test, TestingModule } from '@nestjs/testing';
import { ParametersService } from './parameters.service';

describe('ParametersService', () => {
  let service: ParametersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParametersService]
    }).compile();

    service = module.get<ParametersService>(ParametersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
