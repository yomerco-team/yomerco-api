import { Logger } from '@nestjs/common';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class Test1610071232956 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    Logger.debug('NOT IMPLEMENTED');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    Logger.debug('NOT IMPLEMENTED');
  }

}
