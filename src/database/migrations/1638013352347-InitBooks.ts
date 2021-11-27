import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks1638013352347 implements MigrationInterface {
  name = 'InitBooks1638013352347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "borrows" ("id" SERIAL NOT NULL, "dateFrom" date NOT NULL, "dateTo" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), "copyId" integer NOT NULL, CONSTRAINT "PK_69f3a91fbbed0a8a2ce30efbce1" PRIMARY KEY ("id")); COMMENT ON COLUMN "borrows"."dateFrom" IS 'Data od'; COMMENT ON COLUMN "borrows"."dateTo" IS 'Data do'; COMMENT ON COLUMN "borrows"."createdAt" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "borrows"."modifiedAt" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "copies" ("id" SERIAL NOT NULL, "number" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), "bookId" integer NOT NULL, CONSTRAINT "PK_e75e3715bd8cd3329397ba0e4dc" PRIMARY KEY ("id")); COMMENT ON COLUMN "copies"."number" IS 'Numer'; COMMENT ON COLUMN "copies"."createdAt" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "copies"."modifiedAt" IS 'Moment modyfikacji rekordu'; COMMENT ON COLUMN "copies"."bookId" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")); COMMENT ON COLUMN "genres"."value" IS 'Wartość'`,
    );
    await queryRunner.query(
      `CREATE TABLE "languages" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id")); COMMENT ON COLUMN "languages"."value" IS 'Wartość'`,
    );
    await queryRunner.query(
      `CREATE TABLE "publishers" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_9d73f23749dca512efc3ccbea6a" PRIMARY KEY ("id")); COMMENT ON COLUMN "publishers"."name" IS 'Nazwa'; COMMENT ON COLUMN "publishers"."createdAt" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "publishers"."modifiedAt" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "comment" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "bookId" integer NOT NULL, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id")); COMMENT ON COLUMN "ratings"."value" IS 'Wartość'; COMMENT ON COLUMN "ratings"."comment" IS 'Komentarz'; COMMENT ON COLUMN "ratings"."createdAt" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "ratings"."bookId" IS 'Identyfikator rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "value" character varying(100) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")); COMMENT ON COLUMN "tags"."value" IS 'Wartość'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."books_type_enum" AS ENUM('book', 'magazine', 'article', 'thesis')`,
    );
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "isbn" character varying(13) NOT NULL, "title" character varying(255) NOT NULL, "issueDate" date NOT NULL, "type" "public"."books_type_enum" NOT NULL, "pagesCount" integer NOT NULL, "details" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), "publisherId" integer NOT NULL, "genreId" integer NOT NULL, "languageId" integer NOT NULL, CONSTRAINT "UQ_54337dc30d9bb2c3fadebc69094" UNIQUE ("isbn"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")); COMMENT ON COLUMN "books"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "books"."isbn" IS 'ISBN'; COMMENT ON COLUMN "books"."title" IS 'Tytuł'; COMMENT ON COLUMN "books"."issueDate" IS 'Data wydania'; COMMENT ON COLUMN "books"."type" IS 'Rodzaj'; COMMENT ON COLUMN "books"."pagesCount" IS 'Liczba stron'; COMMENT ON COLUMN "books"."details" IS 'Szczegółowe informacje'; COMMENT ON COLUMN "books"."createdAt" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "books"."modifiedAt" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id")); COMMENT ON COLUMN "authors"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "authors"."firstName" IS 'Imię'; COMMENT ON COLUMN "authors"."lastName" IS 'Nazwisko'; COMMENT ON COLUMN "authors"."createdAt" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "authors"."modifiedAt" IS 'Moment modyfikacji rekordu'`,
    );
    await queryRunner.query(
      `CREATE TABLE "books_authors" ("booksId" integer NOT NULL, "authorsId" integer NOT NULL, CONSTRAINT "PK_b11eee472df51bc2878d599a659" PRIMARY KEY ("booksId", "authorsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5dc8c40ffd14a0b53ec702bb8" ON "books_authors" ("booksId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_716e46108482b2cdfbc72008ca" ON "books_authors" ("authorsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "books_tags" ("booksId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_8d764a68ff753749f2b9b70f529" PRIMARY KEY ("booksId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f587766daac4e1816d74783157" ON "books_tags" ("booksId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_09fd5315b3f85cdd0ed0101a0a" ON "books_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_46ee06eec29dad66eac38bafeb4" FOREIGN KEY ("copyId") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "FK_5ca49f2d8038789b7d34cad54f1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_0563ca767066800a8b2123e6d15" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_594ad92cc478a33e51fd0e31bf3" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_49060974a6295b7f70ac2c102b5" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_b5dc8c40ffd14a0b53ec702bb8e" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_716e46108482b2cdfbc72008cac" FOREIGN KEY ("authorsId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" ADD CONSTRAINT "FK_f587766daac4e1816d747831576" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" ADD CONSTRAINT "FK_09fd5315b3f85cdd0ed0101a0ad" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books_tags" DROP CONSTRAINT "FK_09fd5315b3f85cdd0ed0101a0ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_tags" DROP CONSTRAINT "FK_f587766daac4e1816d747831576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_716e46108482b2cdfbc72008cac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_b5dc8c40ffd14a0b53ec702bb8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_49060974a6295b7f70ac2c102b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_594ad92cc478a33e51fd0e31bf3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_0563ca767066800a8b2123e6d15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "FK_5ca49f2d8038789b7d34cad54f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_46ee06eec29dad66eac38bafeb4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_09fd5315b3f85cdd0ed0101a0a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f587766daac4e1816d74783157"`,
    );
    await queryRunner.query(`DROP TABLE "books_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_716e46108482b2cdfbc72008ca"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b5dc8c40ffd14a0b53ec702bb8"`,
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
