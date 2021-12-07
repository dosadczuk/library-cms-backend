import { HttpAwareError } from '@/shared/errors/http-aware.error';
import { BadRequestException } from '@nestjs/common';

export class BookAlreadyExistsError extends Error implements HttpAwareError {
  constructor(public readonly isbn: string, message?: string) {
    super(message ?? `Book with ISBN '${isbn} already exists.'`);
  }

  getHttpError(): Error {
    return new BadRequestException(this, this.message);
  }
}
