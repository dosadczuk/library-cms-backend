import { CreateCopy } from '@/modules/books/dto/create-copy.dto';
import { Copy } from '@/modules/books/entities/copy.entity';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { CopyRepository } from '@/modules/books/repositories/copy.repository';
import { InjectRepository } from '@nestjs/typeorm';

export class CopiesService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    @InjectRepository(CopyRepository)
    private readonly copyRepository: CopyRepository,
  ) {}

  findByBook(bookId: string): Promise<Copy[]> {
    return this.copyRepository.findByBook(bookId);
  }

  async create(bookId: string, data: CreateCopy): Promise<Copy> {
    const book = await this.bookRepository.findOne(bookId);
    if (book == null) {
      throw new BookNotFoundError(bookId);
    }

    const copy = data.toEntity();
    copy.book = book;

    return this.copyRepository.save(copy);
  }
}
