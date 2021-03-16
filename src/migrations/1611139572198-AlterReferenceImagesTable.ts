import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterReferenceImagesTable1611139572198 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table reference_images rename column reference_if to reference_id;
    `);
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table reference_images rename column reference_id to reference_if;
    `);
  }
}
