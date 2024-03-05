import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';
export class UserDto implements User {
  constructor(partial?: Partial<UserDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Exclude()
  password: string;
}
