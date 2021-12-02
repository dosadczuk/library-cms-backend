import { HttpError } from '@/errors/http.error';
import { File } from '@/modules/files/entities/file.entity';
import { HttpException, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError as NotFoundError } from 'typeorm';

export class FileNotFoundError extends NotFoundError implements HttpError {
  constructor(criteria: any) {
    super(File, criteria);
  }

  getHttpError(): HttpException {
    return new NotFoundException(this.message);
  }
}
