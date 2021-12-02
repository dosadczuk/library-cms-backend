import { HttpError } from '@/errors/http.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class CopyInvalidBookError extends Error implements HttpError {
  constructor(copyId: string, bookId: string, message?: string) {
    super(
      message ?? `Copy with id of "${copyId}" has no book with id of ${bookId}`,
    );
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
