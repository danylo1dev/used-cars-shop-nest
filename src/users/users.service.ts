import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: CreateUserDto): Promise<User> {
    const data = new User(user);
    return await this.prisma.user.create({ data });
  }
  async findUnique(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({ where });
  }
  async findOneById(id: number) {
    return await this.findUnique({ id });
  }
  async find(where?: Prisma.UserWhereInput): Promise<User[]> {
    return await this.prisma.user.findMany({ where });
  }
  async update(id: number, data: UpdateUserDto): Promise<User> {
    data.email = data.email && data.email.toLowerCase();
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
