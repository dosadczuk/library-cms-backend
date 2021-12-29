import { RemoveBookRatingCommand } from '@/modules/books/commands/remove-book-rating/remove-book-rating.command';
import { Rating } from '@/modules/books/entities';
import { BookRatingNotFoundError } from '@/modules/books/errors';
import { BookRepository } from '@/modules/books/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookRatingCommand)
export class RemoveBookRatingHandler implements ICommandHandler<RemoveBookRatingCommand> {
  constructor(private readonly repository: BookRepository) {}

  async execute(command: RemoveBookRatingCommand): Promise<any> {
    const rating = await this.findBookRating(command);
    if (rating == null || rating.bookId != command.bookId) {
      throw new BookRatingNotFoundError(command.bookId, command.ratingId);
    }

    await this.repository.removeRating(rating);
  }

  private async findBookRating(command: RemoveBookRatingCommand): Promise<Rating | null> {
    return this.repository.findBookRating(command.bookId, command.ratingId);
  }
}
