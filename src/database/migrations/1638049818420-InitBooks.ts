import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks1638049818420 implements MigrationInterface {
  name = 'InitBooks1638049818420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "borrows" ("id" SERIAL NOT NULL, "date_from" date NOT NULL, "date_to" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP DEFAULT now(), "copy_id" integer NOT NULL, CONSTRAINT "PK_69f3a91fbbed0a8a2ce30efbce1" PRIMARY KEY ("id")); COMMENT ON COLUMN "borrows"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "borrows"."date_from" IS 'Data od'; COMMENT ON COLUMN "borrows"."date_to" IS 'Data do'; COMMENT ON COLUMN "borrows"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "borrows"."modified_at" IS 'Moment modyfikacji rekordu'; COMMENT ON COLUMN "borrows"."copy_id" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "copies" ("id" SERIAL NOT NULL, "number" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP DEFAULT now(), "book_id" integer NOT NULL, CONSTRAINT "PK_e75e3715bd8cd3329397ba0e4dc" PRIMARY KEY ("id")); COMMENT ON COLUMN "copies"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "copies"."number" IS 'Numer'; COMMENT ON COLUMN "copies"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "copies"."modified_at" IS 'Moment modyfikacji rekordu'; COMMENT ON COLUMN "copies"."book_id" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")); COMMENT ON COLUMN "genres"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "genres"."value" IS 'Wartość'`,
    );
    await queryRunner.query(
      `CREATE TABLE "languages" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id")); COMMENT ON COLUMN "languages"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "languages"."value" IS 'Wartość'`,
    );
    await queryRunner.query(
      `CREATE TABLE "publishers" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_9d73f23749dca512efc3ccbea6a" PRIMARY KEY ("id")); COMMENT ON COLUMN "publishers"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "publishers"."name" IS 'Nazwa'; COMMENT ON COLUMN "publishers"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "publishers"."modified_at" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "comment" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "book_id" integer NOT NULL, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id")); COMMENT ON COLUMN "ratings"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "ratings"."value" IS 'Wartość'; COMMENT ON COLUMN "ratings"."comment" IS 'Komentarz'; COMMENT ON COLUMN "ratings"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "ratings"."book_id" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")); COMMENT ON COLUMN "tags"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "tags"."value" IS 'Wartość'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."books_type_enum" AS ENUM('book', 'magazine', 'article', 'thesis')`,
    );
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "isbn" character varying(13) NOT NULL, "title" character varying(255) NOT NULL, "issue_date" date NOT NULL, "type" "public"."books_type_enum" NOT NULL, "pages" integer NOT NULL, "details" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP DEFAULT now(), "publisher_id" integer NOT NULL, "genre_id" integer NOT NULL, "language_id" integer NOT NULL, CONSTRAINT "UQ_54337dc30d9bb2c3fadebc69094" UNIQUE ("isbn"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")); COMMENT ON COLUMN "books"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "books"."isbn" IS 'ISBN'; COMMENT ON COLUMN "books"."title" IS 'Tytuł'; COMMENT ON COLUMN "books"."issue_date" IS 'Data wydania'; COMMENT ON COLUMN "books"."type" IS 'Rodzaj'; COMMENT ON COLUMN "books"."pages" IS 'Liczba stron'; COMMENT ON COLUMN "books"."details" IS 'Szczegółowe informacje'; COMMENT ON COLUMN "books"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "books"."modified_at" IS 'Moment modyfikacji rekordu'; COMMENT ON COLUMN "books"."publisher_id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "books"."genre_id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "books"."language_id" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id")); COMMENT ON COLUMN "authors"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "authors"."first_name" IS 'Imię'; COMMENT ON COLUMN "authors"."last_name" IS 'Nazwisko'; COMMENT ON COLUMN "authors"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "authors"."modified_at" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "books_authors" ("book_id" integer NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_ec21802e4c7a8a22887600d7709" PRIMARY KEY ("book_id", "author_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf3c609a7c91bc032b805bbe14" ON "books_authors" ("book_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_738bc3574491eddb6cdd06896c" ON "books_authors" ("author_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "books_tags" ("book_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_9f5349d11ea8cf4f5dbe4baae9d" PRIMARY KEY ("book_id", "tag_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_77ba62723b88dfee0f1787f054" ON "books_tags" ("book_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c62da474cb4f4487a3c04518b" ON "books_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883" FOREIGN KEY ("copy_id") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "FK_4e04092cf610812045d2766d07e" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_3164a2958d73d8cdebe5204c838"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_3b94b035d80d7564abd012014c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_370ec5bbafd46f74b23a20a5298"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "FK_4e04092cf610812045d2766d07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_4be0d26f71f4ebc4319fa134883"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c62da474cb4f4487a3c04518b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_77ba62723b88dfee0f1787f054"`,
    );
    await queryRunner.query(`DROP TABLE "books_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_738bc3574491eddb6cdd06896c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf3c609a7c91bc032b805bbe14"`,
    );
    await queryRunner.query(`DROP TABLE "books_authors"`);
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`DROP TABLE "books"`);
    await queryRunner.query(`DROP TYPE "public"."books_type_enum"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "ratings"`);
    await queryRunner.query(`DROP TABLE "publishers"`);
    await queryRunner.query(`DROP TABLE "languages"`);
    await queryRunner.query(`DROP TABLE "genres"`);
    await queryRunner.query(`DROP TABLE "copies"`);
    await queryRunner.query(`DROP TABLE "borrows"`);
  }
}
