import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
  id: number;
  email: string;
  password: string;
}
