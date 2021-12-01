import { Copy } from '@/modules/books/entities/copy.entity';
import { EntityRepository, Equal, Repository } from 'typeorm';

@EntityRepository(Copy)
export class CopyRepository extends Repository<Copy> {
  findByBook(bookId: string) {
    return this.find({
      where: {
        book: { id: Equal(bookId) },
      },
    });
  }
}
