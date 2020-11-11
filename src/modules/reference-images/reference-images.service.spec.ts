import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceImagesService } from './reference-images.service';

describe('ReferenceImagesService', () => {
  let service: ReferenceImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceImagesService]
    }).compile();

    service = module.get<ReferenceImagesService>(ReferenceImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
