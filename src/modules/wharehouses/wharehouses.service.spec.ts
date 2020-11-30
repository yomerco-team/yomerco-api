import { Test, TestingModule } from '@nestjs/testing';
import { WharehousesService } from './wharehouses.service';

describe('WharehousesService', () => {
  let service: WharehousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WharehousesService]
    }).compile();

    service = module.get<WharehousesService>(WharehousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
