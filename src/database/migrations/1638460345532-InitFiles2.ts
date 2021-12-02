import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitFiles21638460345532 implements MigrationInterface {
  name = 'InitFiles21638460345532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" ADD "checksum" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "files"."checksum" IS 'Suma kontrolna'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "files"."checksum" IS 'Suma kontrolna'`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "checksum"`);
  }
}
