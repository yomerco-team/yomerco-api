import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReferencePrice } from './reference-price.entity';

import { CreateFromReferenceInput } from './dto/create-from-reference-input.dto';

@Injectable()
export class ReferencePricesService {
  constructor (
    @InjectRepository(ReferencePrice)
    private readonly referencePriceRepository: Repository<ReferencePrice>
  ) {}

  public async createFromReference (createFromReferenceInput: CreateFromReferenceInput): Promise<ReferencePrice> {
    const created = this.referencePriceRepository.create({
      city: createFromReferenceInput.city,
      reference: createFromReferenceInput.reference,
      desiredMarginPercentage: createFromReferenceInput.desiredMarginPercentage,
      discountPercentage: createFromReferenceInput.discountPercentage,
      discountValue: createFromReferenceInput.discountValue
    });

    const saved = await this.referencePriceRepository.save(created);

    return saved;
  }
}
