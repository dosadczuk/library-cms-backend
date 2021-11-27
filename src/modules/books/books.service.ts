import { Book } from '@/modules/books/entities/book.entity';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
