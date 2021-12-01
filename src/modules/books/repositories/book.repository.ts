import { Book } from '@/modules/books/entities/book.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {}
