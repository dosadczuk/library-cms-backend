export class BookAlreadyExistsError extends Error {
  constructor(public readonly isbn: string, message?: string) {
    super(message ?? `Book with ISBN '${isbn} already exists.'`);
  }
}
