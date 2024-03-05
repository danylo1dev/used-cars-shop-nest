import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService],
})
export class UsersModule {}
