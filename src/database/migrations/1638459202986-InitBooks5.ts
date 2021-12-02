import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks51638459202986 implements MigrationInterface {
  name = 'InitBooks51638459202986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" ADD "description" text`);
    await queryRunner.query(
      `COMMENT ON COLUMN "books"."description" IS 'Opis'`,
    );
    await queryRunner.query(`ALTER TABLE "books" ADD "image_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "UQ_ce3191ad6f325cb5b184d656dd8" UNIQUE ("image_id")`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "books"."image_id" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_ce3191ad6f325cb5b184d656dd8" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_ce3191ad6f325cb5b184d656dd8"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "books"."image_id" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "UQ_ce3191ad6f325cb5b184d656dd8"`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image_id"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "books"."description" IS 'Opis'`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "description"`);
  }
}
