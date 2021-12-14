import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsers1639499291527 implements MigrationInterface {
  name = 'InitUsers1639499291527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'employee', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(100) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "last_logged_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP DEFAULT now(), "removed_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'Identyfikator rekordu'; COMMENT ON COLUMN "users"."first_name" IS 'Imie'; COMMENT ON COLUMN "users"."last_name" IS 'Nazwisko'; COMMENT ON COLUMN "users"."email" IS 'E-mail'; COMMENT ON COLUMN "users"."password" IS 'Hasło'; COMMENT ON COLUMN "users"."role" IS 'Rola'; COMMENT ON COLUMN "users"."is_active" IS 'Czy aktywny'; COMMENT ON COLUMN "users"."last_logged_at" IS 'Moment ostatniego logowania'; COMMENT ON COLUMN "users"."created_at" IS 'Moment utworzenia rekordu'; COMMENT ON COLUMN "users"."modified_at" IS 'Moment modyfikacji rekordu'; COMMENT ON COLUMN "users"."removed_at" IS 'Moment usunięcia rekordu'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
