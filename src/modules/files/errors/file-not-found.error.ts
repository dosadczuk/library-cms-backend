import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class FileNotFoundError extends Error implements HttpAwareError {
  constructor(id: string) {
    super(i18n('files.FileNotFound', { id }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
