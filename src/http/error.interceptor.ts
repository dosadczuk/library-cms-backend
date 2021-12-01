import { isHttpError } from '@/errors/http.error';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

export class ErrorInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (isHttpError(error)) {
          throw error.getHttpError();
        }

        throw error;
      }),
    );
  }
}
