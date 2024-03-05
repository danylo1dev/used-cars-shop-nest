import { User as PrismaUser } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
export class User implements PrismaUser {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Exclude()
  password: string;
}
