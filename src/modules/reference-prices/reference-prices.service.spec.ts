import { Test, TestingModule } from '@nestjs/testing';
import { ReferencePricesService } from './reference-prices.service';

describe('ReferencePricesService', () => {
  let service: ReferencePricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferencePricesService]
    }).compile();

    service = module.get<ReferencePricesService>(ReferencePricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
