import { HttpError } from '@/errors/http.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookAlreadyExistsError extends Error implements HttpError {
  constructor(isbn: string, message?: string) {
    super(message ?? `Book with ISBN "${isbn}" already exists`);
  }

  public getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
