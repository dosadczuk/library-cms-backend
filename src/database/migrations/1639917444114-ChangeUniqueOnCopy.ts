import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUniqueOnCopy1639917444114 implements MigrationInterface {
  name = 'ChangeUniqueOnCopy1639917444114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_644b268e582671566ae8f78f5fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_816e5e74f60e2e594c4244114ad" UNIQUE ("number", "book_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "copies" DROP CONSTRAINT "UQ_816e5e74f60e2e594c4244114ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "copies" ADD CONSTRAINT "UQ_644b268e582671566ae8f78f5fe" UNIQUE ("number")`,
    );
  }
}
