import { CreateBookRatingCommand } from '@/modules/books/commands/create-book-rating/create-book-rating.command';
import { CreateBookRatingResult } from '@/modules/books/commands/create-book-rating/create-book-rating.result';
import { CreateUpdateBookRatingResultDto } from '@/modules/books/dto';
import { Book, Rating } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { BookRepository } from '@/modules/books/repositories';
import { RatingViewModel } from '@/modules/books/vms';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateBookRatingCommand)
export class CreateBookRatingHandler
  implements ICommandHandler<CreateBookRatingCommand, CreateBookRatingResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(command: CreateBookRatingCommand): Promise<CreateBookRatingResult> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    const rating = this.createBookRating(book, command);

    await this.repository.persistRating(rating);

    const result = new CreateUpdateBookRatingResultDto(new RatingViewModel(rating));

    return new CreateBookRatingResult(result);
  }

  private async findBook(command: CreateBookRatingCommand): Promise<Book | null> {
    return this.repository.findOne(command.bookId);
  }

  private createBookRating(book: Book, command: CreateBookRatingCommand): Rating {
    const rating = new Rating();
    rating.value = command.rating.value;
    rating.comment = command.rating.comment;
    rating.book = book;

    return rating;
  }
}
