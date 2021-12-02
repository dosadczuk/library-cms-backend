import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks41638433219997 implements MigrationInterface {
  name = 'InitBooks41638433219997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "copies" ADD "removed_at" TIMESTAMP`);
    await queryRunner.query(
      `COMMENT ON COLUMN "copies"."removed_at" IS 'Moment usunięcie rekordu'`,
    );
    await queryRunner.query(`ALTER TABLE "books" ADD "removed_at" TIMESTAMP`);
    await queryRunner.query(
      `COMMENT ON COLUMN "books"."removed_at" IS 'Moment usunięcia rekordu'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "books"."removed_at" IS 'Moment usunięcia rekordu'`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "removed_at"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "copies"."removed_at" IS 'Moment usunięcie rekordu'`,
    );
    await queryRunner.query(`ALTER TABLE "copies" DROP COLUMN "removed_at"`);
  }
}
