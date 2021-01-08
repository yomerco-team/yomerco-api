import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductProvider } from './product-provider.entity';

@Injectable()
export class ProductProvidersService {
  constructor(
    @InjectRepository(ProductProvider)
    private readonly productProviderRepository: Repository<ProductProvider>
  ){}
}
