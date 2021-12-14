import { isHttpAwareError } from '@/http/http-aware.error';
import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(_, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (isHttpAwareError(err)) {
          throw err.getHttpError();
        }

        throw err;
      }),
    );
  }
}
