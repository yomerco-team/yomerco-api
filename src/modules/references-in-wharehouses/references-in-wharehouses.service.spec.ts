import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesInWharehousesService } from './references-in-wharehouses.service';

describe('ReferencesInWharehousesService', () => {
  let service: ReferencesInWharehousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferencesInWharehousesService]
    }).compile();

    service = module.get<ReferencesInWharehousesService>(ReferencesInWharehousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
