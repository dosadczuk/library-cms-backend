import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserToRating1653935744819 implements MigrationInterface {
    name = 'AddUserToRating1653935744819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`);
        await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_f49ef8d0914a14decddbb170f2f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_f49ef8d0914a14decddbb170f2f"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55"`);
        await queryRunner.query(`COMMENT ON COLUMN "ratings"."book_id" IS 'Identyfikator książki'`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_5eeacfb75e4972bec496e76cc55" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "user_id"`);
    }

}
