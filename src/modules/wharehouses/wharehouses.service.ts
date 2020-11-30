import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wharehouse } from './wharehouse.entity';

@Injectable()
export class WharehousesService {
  constructor(
    @InjectRepository(Wharehouse)
    private readonly wharehouseRepository: Repository<Wharehouse>
  ) {}
}
