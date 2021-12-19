import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnsComments1639824210923 implements MigrationInterface {
  name = 'ChangeColumnsComments1639824210923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_738bc3574491eddb6cdd06896c6"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "authors"."id" IS 'Identyfikator autora'`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3b94b035d80d7564abd012014c8"`);
    await queryRunner.query(`COMMENT ON COLUMN "genres"."id" IS 'Identyfikator gatunku'`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3164a2958d73d8cdebe5204c838"`);
    await queryRunner.query(`COMMENT ON COLUMN "languages"."id" IS 'Identyfikator języka'`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298"`);
    await queryRunner.query(`COMMENT ON COLUMN "publishers"."id" IS 'Identyfikator wydawcy'`);
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."id" IS 'Identyfikator oceny'`);
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS 'Identyfikator książki'`);
    await queryRunner.query(
      `ALTER TABLE "books_tags" DROP CONSTRAINT "FK_6c62da474cb4f4487a3c04518b7"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "tags"."id" IS 'Identyfikator tagu'`);
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS 'Identyfikator użytkownika'`);
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."id" IS 'Identyfikator wypożyczenia'`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."copy_id" IS 'Identyfikator egzemplarza'`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."user_id" IS 'Identyfikator użytkownika'`);
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "FK_4e04092cf610812045d2766d07e"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "copies"."id" IS 'Identyfikator egzemplarza'`);
    await queryRunner.query(`COMMENT ON COLUMN "copies"."book_id" IS 'Identyfikator książki'`);
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_ce3191ad6f325cb5b184d656dd8"`);
    await queryRunner.query(`COMMENT ON COLUMN "files"."id" IS 'Identyfikator pliku'`);
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_bf3c609a7c91bc032b805bbe14d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" DROP CONSTRAINT "FK_77ba62723b88dfee0f1787f054e"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "books"."id" IS 'Identyfikator książki'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."publisher_id" IS 'Identyfikator wydawcy'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."genre_id" IS 'Identyfikator gatunku'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."language_id" IS 'Identyfikator języka'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."image_id" IS 'Identyfikator pliku'`);
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
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_ce3191ad6f325cb5b184d656dd8" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_bf3c609a7c91bc032b805bbe14d" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_738bc3574491eddb6cdd06896c6" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" ADD CONSTRAINT "FK_77ba62723b88dfee0f1787f054e" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" ADD CONSTRAINT "FK_6c62da474cb4f4487a3c04518b7" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books_tags" DROP CONSTRAINT "FK_6c62da474cb4f4487a3c04518b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" DROP CONSTRAINT "FK_77ba62723b88dfee0f1787f054e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_738bc3574491eddb6cdd06896c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_bf3c609a7c91bc032b805bbe14d"`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_ce3191ad6f325cb5b184d656dd8"`);
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
    await queryRunner.query(`COMMENT ON COLUMN "books"."image_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."language_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."genre_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."publisher_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "books"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books_tags" ADD CONSTRAINT "FK_77ba62723b88dfee0f1787f054e" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_bf3c609a7c91bc032b805bbe14d" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "files"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_ce3191ad6f325cb5b184d656dd8" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "copies"."book_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "copies"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "FK_4e04092cf610812045d2766d07e" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."user_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."copy_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883" FOREIGN KEY ("copy_id") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "tags"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books_tags" ADD CONSTRAINT "FK_6c62da474cb4f4487a3c04518b7" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`COMMENT ON COLUMN "ratings"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "publishers"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "languages"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3164a2958d73d8cdebe5204c838" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "genres"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_3b94b035d80d7564abd012014c8" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "authors"."id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_738bc3574491eddb6cdd06896c6" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
