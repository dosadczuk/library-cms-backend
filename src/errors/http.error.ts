import { HttpException } from '@nestjs/common';

export interface HttpError {
  getHttpError(): HttpException;
}

export const isHttpError = (error: any): error is HttpError => {
  return 'getHttpError' in error;
};
