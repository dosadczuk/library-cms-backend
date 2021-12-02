import { HttpError } from '@/errors/http.error';
import { Copy } from '@/modules/books/entities';
import {
  HttpException,
  NotFoundException,
  NotFoundException as NotFoundError,
} from '@nestjs/common';

export class CopyNotFoundError extends NotFoundError implements HttpError {
  constructor(criteria: any) {
    super(Copy, criteria);
  }

  getHttpError(): HttpException {
    return new NotFoundException(this.message);
  }
}
