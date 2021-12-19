export class FindBookCopyBorrowQuery {
  constructor(readonly bookId: number, readonly copyId: number, readonly borrowId: number) {}
}
