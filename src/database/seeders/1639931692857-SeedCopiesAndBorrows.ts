import { BorrowSeed } from '@/database/seeders/seeds/borrow.seed';
import { CopySeed } from '@/database/seeders/seeds/copy.seed';
import { Borrow, Copy } from '@/modules/books/entities';
import { getConnection, MigrationInterface } from 'typeorm';

export class SeedCopiesAndBorrows1639931692857 implements MigrationInterface {
  public async up(): Promise<void> {
    const connection = getConnection('seeder');

    return connection.transaction(async (manager) => {
      await manager.getRepository(Copy).save(CopySeed);
      await manager.getRepository(Borrow).save(BorrowSeed);
    });
  }

  public async down(): Promise<void> {
    // nothing
  }
}
