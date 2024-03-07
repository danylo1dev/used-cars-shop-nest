import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CurrentSessionUserInterceptor } from "src/users/interceptors/current-user.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UsersService } from "src/users/users.service";

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,
    PrismaService,
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentSessionUserInterceptor,
    },
  ],
})
export class ReportsModule {}
