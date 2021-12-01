import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { Book as Entity, METADATA } from '@/modules/books/entities/book.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBook extends OmitType(CreateBook, ['toEntity']) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    title: METADATA.id.title,
  })
  id: number;

  toEntity(): Entity {
    const book = new Entity();
    book.id = this.id;
    book.isbn = this.isbn;
    book.title = this.title;
    book.issueDate = this.issueDate;
    book.publisher = this.publisher.toEntity();
    book.authors = this.authors.map((it) => it.toEntity());
    book.type = this.type;
    book.genre = this.genre.toEntity();
    book.language = this.language.toEntity();
    book.pages = this.pages;
    book.tags = this.tags.map((it) => it.toEntity());
    book.details = this.details;

    return book;
  }
}
