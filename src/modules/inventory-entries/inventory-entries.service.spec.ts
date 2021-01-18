import { Test, TestingModule } from '@nestjs/testing';
import { InventoryEntriesService } from './inventory-entries.service';

describe('InventoryEntriesService', () => {
  let service: InventoryEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryEntriesService]
    }).compile();

    service = module.get<InventoryEntriesService>(InventoryEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
