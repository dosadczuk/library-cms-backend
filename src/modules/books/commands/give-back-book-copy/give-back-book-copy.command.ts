export class GiveBackBookCopyCommand {
  constructor(readonly bookId: number, readonly copyId: number, readonly borrowId: number) {}
}
