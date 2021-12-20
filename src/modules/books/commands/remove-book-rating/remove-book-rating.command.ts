export class RemoveBookRatingCommand {
  constructor(readonly bookId: number, readonly ratingId: number) {}
}
