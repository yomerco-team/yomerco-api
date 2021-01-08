import { Test, TestingModule } from '@nestjs/testing';
import { ProductProvidersService } from './product-providers.service';

describe('ProductProvidersService', () => {
  let service: ProductProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductProvidersService]
    }).compile();

    service = module.get<ProductProvidersService>(ProductProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
