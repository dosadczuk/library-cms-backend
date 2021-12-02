import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitFiles1638458138124 implements MigrationInterface {
  name = 'InitFiles1638458138124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "path" character varying(250) NOT NULL, "size" integer NOT NULL, "mime" character varying(50) NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")); COMMENT ON COLUMN "files"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "files"."name" IS 'Nazwa'; COMMENT ON COLUMN "files"."path" IS 'Ścieżka na dysku'; COMMENT ON COLUMN "files"."size" IS 'Rozmiar'; COMMENT ON COLUMN "files"."mime" IS 'Typ MIME'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
