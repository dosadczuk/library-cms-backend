import { BookAlreadyExistsError } from '@/modules/books/errors/book-already-exists.error';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

export class ErrorInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BookNotFoundError) {
          throw new NotFoundException(error.message);
        }

        if (error instanceof BookAlreadyExistsError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
