import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRating1640026813042 implements MigrationInterface {
  name = 'UpdateRating1640026813042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`,
    );
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "value"`);
    await queryRunner.query(`ALTER TABLE "ratings" ADD "value" numeric(2,1) NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."value" IS 'Wartość'`);
    await queryRunner.query(`ALTER TABLE "ratings" ALTER COLUMN "comment" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS 'Identyfikator książki'`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298"`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3b94b035d80d7564abd012014c8"`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3164a2958d73d8cdebe5204c838"`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."publisher_id" IS 'Identyfikator wydawcy'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."genre_id" IS 'Identyfikator gatunku'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."language_id" IS 'Identyfikator języka'`);
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3b94b035d80d7564abd012014c8" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3164a2958d73d8cdebe5204c838" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3164a2958d73d8cdebe5204c838"`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3b94b035d80d7564abd012014c8"`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298"`);
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "books"."language_id" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."genre_id" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."publisher_id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3164a2958d73d8cdebe5204c838" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3b94b035d80d7564abd012014c8" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS NULL`);
    await queryRunner.query(`ALTER TABLE "ratings" ALTER COLUMN "comment" SET NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."value" IS 'Wartość'`);
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "value"`);
    await queryRunner.query(`ALTER TABLE "ratings" ADD "value" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
