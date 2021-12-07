import { HttpException } from '@nestjs/common/exceptions/http.exception';

export interface HttpAwareError {
  getHttpError(): HttpException;
}

export const isHttpAwareError = (error: any): error is HttpAwareError => {
  return 'getHttpError' in error;
};
