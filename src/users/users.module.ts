import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CurrentSessionUserMiddleware } from "src/middlewares/current-user.middleware";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentSessionUserMiddleware).forRoutes("*");
  }
}
