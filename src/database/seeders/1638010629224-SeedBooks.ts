import { AuthorSeed } from '@/database/seeders/seeds/author.seed';
import { BookSeed } from '@/database/seeders/seeds/book.seed';
import { GenreSeed } from '@/database/seeders/seeds/genre.seed';
import { LanguageSeed } from '@/database/seeders/seeds/language.seed';
import { PublisherSeed } from '@/database/seeders/seeds/publisher.seed';
import { TagSeed } from '@/database/seeders/seeds/tag.seed';
import { Author } from '@/modules/books/entities/author.entity';
import { Book } from '@/modules/books/entities/book.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { getConnection, MigrationInterface } from 'typeorm';

export class SeedBooks1638010629224 implements MigrationInterface {
  name = 'SeedBooks1638010629224';

  public async up(): Promise<void> {
    const connection = getConnection('seeder');

    return connection.transaction(async (manager) => {
      await manager.getRepository(Author).save(AuthorSeed);
      await manager.getRepository(Genre).save(GenreSeed);
      await manager.getRepository(Language).save(LanguageSeed);
      await manager.getRepository(Publisher).save(PublisherSeed);
      await manager.getRepository(Tag).save(TagSeed);
      await manager.getRepository(Book).save(BookSeed);
    });
  }

  public async down(): Promise<void> {
    // nothing
  }
}
