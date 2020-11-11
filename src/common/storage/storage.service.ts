import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = new Storage();
  }
}
