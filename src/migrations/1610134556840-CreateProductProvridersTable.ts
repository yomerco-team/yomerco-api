import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateProductProvridersTable1610134556840 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table product_providers
      (
        id serial not null
          constraint product_providers_pk
            primary key,
        nit varchar(20),
        document varchar(20),
        email varchar(100) not null,
        address varchar(200) not null,
        phone varchar(10) not null,
        created_at date default now(),
        updated_at date default now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table "product_providers"');
  }

}
