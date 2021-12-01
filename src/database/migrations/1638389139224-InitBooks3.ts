import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks31638389139224 implements MigrationInterface {
  name = 'InitBooks31638389139224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_644b268e582671566ae8f78f5fe"`,
    );
    await queryRunner.query(`ALTER TABLE "copies" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "copies" ADD "number" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_644b268e582671566ae8f78f5fe" UNIQUE ("number")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "copies"."number" IS 'Numer'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "copies"."number" IS 'Numer'`);
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_644b268e582671566ae8f78f5fe"`,
    );
    await queryRunner.query(`ALTER TABLE "copies" DROP COLUMN "number"`);
    await queryRunner.query(`ALTER TABLE "copies" ADD "number" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_644b268e582671566ae8f78f5fe" UNIQUE ("number")`,
    );
  }
}
