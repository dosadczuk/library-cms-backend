import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToBorrow1639823816919 implements MigrationInterface {
  name = 'AddUserToBorrow1639823816919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrows" ADD "user_id" integer NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."user_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(
      `ALTER TABLE "borrows" ADD CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "borrows" DROP CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "borrows"."user_id" IS 'Identyfikator rekordu'`);
    await queryRunner.query(`ALTER TABLE "borrows" DROP COLUMN "user_id"`);
  }
}
