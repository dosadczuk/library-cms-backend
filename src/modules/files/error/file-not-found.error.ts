import { File } from '@/modules/files/entities/file.entity';
import { HttpAwareError } from '@/shared/errors/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';
import { EntityNotFoundError as NotFoundError } from 'typeorm';

export class FileNotFoundError extends NotFoundError implements HttpAwareError {
  constructor(criteria: any) {
    super(File, criteria);
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
