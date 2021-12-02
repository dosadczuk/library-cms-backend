import { CreateCopy } from '@/modules/books/dto';
import { Book, Copy } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { CopyInvalidBookError } from '@/modules/books/errors/copy-invalid-book.error';
import { CopyNotFoundError } from '@/modules/books/errors/copy-not-found.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

export class CopiesService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Copy)
    private readonly copyRepository: Repository<Copy>,
  ) {}

  async findByBook(bookId: string): Promise<Copy[]> {
    const book = await this.bookRepository.findOne(bookId);
    if (book == null) {
      throw new BookNotFoundError(bookId);
    }

    return this.copyRepository.find({
      where: { book: { id: Equal(bookId) } },
    });
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

  async remove(bookId: string, copyId: string) {
    const copy = await this.copyRepository.findOne(copyId, {
      relations: ['book'],
    });
    if (copy == null) {
      throw new CopyNotFoundError(copyId);
    }

    if (copy.book.id !== Number(bookId)) {
      throw new CopyInvalidBookError(copyId, bookId);
    }

    return this.copyRepository.softDelete(copyId);
  }
}
