import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsers1638703343982 implements MigrationInterface {
  name = 'InitUsers1638703343982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'employee', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(32) NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "users"."first_name" IS 'Imie'; COMMENT ON COLUMN "users"."last_name" IS 'Nazwisko'; COMMENT ON COLUMN "users"."email" IS 'E-mail'; COMMENT ON COLUMN "users"."password" IS 'Hasło'; COMMENT ON COLUMN "users"."role" IS 'Rola'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
