import { BookSeed } from '@/database/seeders/seeds/book.seed';
import { Book } from '@/modules/books/entities/book.entity';
import { getRepository, MigrationInterface } from 'typeorm';

export class SeedBooks1638010629224 implements MigrationInterface {
  name = 'SeedBooks1638010629224';

  public async up(): Promise<void> {
    await getRepository(Book, 'seeder').save(BookSeed);
  }

  public async down(): Promise<void> {
    // nothing
  }
}
