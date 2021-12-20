import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingFields1639932930758 implements MigrationInterface {
  name = 'AddMissingFields1639932930758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "files"."created_at" IS 'Moment utworzenia rekordu'`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."copy_id" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."user_id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "FK_4e04092cf610812045d2766d07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_816e5e74f60e2e594c4244114ad"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "copies"."book_id" IS NULL`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298"`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3b94b035d80d7564abd012014c8"`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3164a2958d73d8cdebe5204c838"`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."publisher_id" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."genre_id" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."language_id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_816e5e74f60e2e594c4244114ad" UNIQUE ("number", "book_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883" FOREIGN KEY ("copy_id") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "FK_4e04092cf610812045d2766d07e" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "copies" DROP CONSTRAINT "FK_4e04092cf610812045d2766d07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_816e5e74f60e2e594c4244114ad"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "books"."language_id" IS 'Identyfikator języka'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."genre_id" IS 'Identyfikator gatunku'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."publisher_id" IS 'Identyfikator wydawcy'`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3164a2958d73d8cdebe5204c838" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3b94b035d80d7564abd012014c8" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "copies"."book_id" IS 'Identyfikator książki'`);
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_816e5e74f60e2e594c4244114ad" UNIQUE ("number", "book_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "FK_4e04092cf610812045d2766d07e" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."user_id" IS 'Identyfikator użytkownika'`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."copy_id" IS 'Identyfikator egzemplarza'`);
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883" FOREIGN KEY ("copy_id") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS 'Identyfikator książki'`);
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "files"."created_at" IS 'Moment utworzenia rekordu'`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "created_at"`);
  }
}
