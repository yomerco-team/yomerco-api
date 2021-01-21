import { Test, TestingModule } from '@nestjs/testing';
import { InventoryEntryDetailsService } from './inventory-entry-details.service';

describe('InventoryEntryDetailsService', () => {
  let service: InventoryEntryDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryEntryDetailsService]
    }).compile();

    service = module.get<InventoryEntryDetailsService>(InventoryEntryDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
