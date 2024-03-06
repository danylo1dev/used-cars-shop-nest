import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User => {
    const { user } = context.switchToHttp().getRequest();
    return user;
  },
);
