export class RemoveBookCopyBorrowCommand {
  constructor(readonly bookId: number, readonly copyId: number, readonly borrowId: number) {}
}
