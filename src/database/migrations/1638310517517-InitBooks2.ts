import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks21638310517517 implements MigrationInterface {
  name = 'InitBooks21638310517517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD "modified_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "ratings"."modified_at" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_644b268e582671566ae8f78f5fe" UNIQUE ("number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" ADD CONSTRAINT "UQ_aaa21d013c0f7479debd7d21a0b" UNIQUE ("value")`,
    );
    await queryRunner.query(
      `ALTER TABLE "languages" ADD CONSTRAINT "UQ_212a72d3830f7841097c30bea48" UNIQUE ("value")`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" ADD CONSTRAINT "UQ_39082806f986a63cd7dcf1782a5" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "UQ_d090e09fe86ebe2ec0aec27b451" UNIQUE ("value")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "UQ_d090e09fe86ebe2ec0aec27b451"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" DROP CONSTRAINT "UQ_39082806f986a63cd7dcf1782a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "languages" DROP CONSTRAINT "UQ_212a72d3830f7841097c30bea48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" DROP CONSTRAINT "UQ_aaa21d013c0f7479debd7d21a0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_644b268e582671566ae8f78f5fe"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "ratings"."modified_at" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "modified_at"`);
  }
}
