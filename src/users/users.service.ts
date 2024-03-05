import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(input: CreateUserDto): Promise<User> {
    const user = await this.findUniqueOrDotThrow({
      email: input.email.toLowerCase(),
    });
    if (user) {
      throw new BadRequestException(
        `User with email ${input.email} alredy exist`,
      );
    }
    const data = new User({ ...input, email: input.email.toLowerCase() });
    return await this.prisma.user.create({ data });
  }
  async findUniqueOrDotThrow(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return await this.prisma.user.findUnique({ where });
  }
  async findOneById(id: number) {
    const user = await this.findUniqueOrDotThrow({ id });
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user;
  }
  async find(where?: Prisma.UserWhereInput): Promise<User[]> {
    return await this.prisma.user.findMany({ where });
  }
  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(+id);
    data.email = data.email && data.email.toLowerCase();
    const userByEmail =
      data.email &&
      (await this.findUniqueOrDotThrow({
        email: data.email,
      }));
    if (userByEmail) {
      throw new BadRequestException(`User with ${user.email} alredy exist`);
    }
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async remove(id: number): Promise<void> {
    const user = await this.findOneById(+id);
    await this.prisma.user.delete({ where: { id } });
  }
}
