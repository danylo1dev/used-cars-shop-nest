import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { CurrentSessionUserInterceptor } from "./interceptors/current-user.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentSessionUserInterceptor,
    },
  ],
})
export class UsersModule {}
