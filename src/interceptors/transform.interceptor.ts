import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseToSerializableInterceptor<T>
  implements NestInterceptor<T>
{
  constructor(private TCreator: new (...arg) => T) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          return Array.isArray(data)
            ? data.map((elem) => new this.TCreator(elem))
            : [data].map((elem) => new this.TCreator(elem));
        } else {
          return data;
        }
      }),
    );
  }
}
