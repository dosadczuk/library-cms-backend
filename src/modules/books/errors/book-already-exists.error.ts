export class BookAlreadyExistsError extends Error {
  constructor(isbn: string, message?: string) {
    super(message ?? `Book with ISBN "${isbn}" already exists`);
  }
}
