import { UseInterceptors } from '@nestjs/common';
import { ResponseToSerializableInterceptor } from 'src/interceptors/transform.interceptor';
export function ResponseToSerializable<T>(
  ClassConstructor: new (...args) => T,
) {
  return UseInterceptors(
    new ResponseToSerializableInterceptor<T>(ClassConstructor),
  );
}
