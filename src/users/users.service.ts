import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }
  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async find(): Promise<User[]> {
    // .map((elem: User): User => {
    //   return new User(elem);
    // });
    return await this.prisma.user.findMany();
  }
  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
