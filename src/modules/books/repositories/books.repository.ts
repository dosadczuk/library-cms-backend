import { Book } from '@/modules/books/entities/book.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  findById(id: number): Promise<Book> {
    return this.findOne(id, {
      relations: ['publisher', 'authors', 'genre', 'language', 'tags'],
      loadRelationIds: {
        relations: ['copies', 'ratings'],
        disableMixedMap: true,
      },
    });
  }
}
