import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateReferencesInWhareHousesTable1610679676314 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table references_in_wharehouses
      (
        id serial not null
          constraint references_in_wharehouses_pk
            primary key,
        wharehouse_id int not null
          constraint fk_references_in_wharehouses_wharehouse_id
            references wharehouses,
        reference_id int not null
          constraint fk_references_in_wharehouses_reference_id
            references "references",
        created_at date default now(),
        updated_at date default now()
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table "references_in_wharehouses"');
  }

}
