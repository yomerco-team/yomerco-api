import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryEntriesTable1610966878085 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create table inventory_entries
    (
      id serial not null
        constraint inventory_entries_pk
          primary key,
      description varchar(200),
      proof_url varchar(200),
      created_at date default now(),
      updated_at date default now(),
      product_provider_id int not null
        constraint fk_inventory_entries_product_provider_id
          references product_providers,
      wharehouse_id int not null
        constraint fk_inventory_entries_wharehouse_id
          references wharehouses
    );
    `);
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table "inventory_entries"');
  }
}
