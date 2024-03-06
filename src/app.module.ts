import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { PrismaService } from './prisma/prisma.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {
  configyre(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CookieSession({
          keys: [process.env.COOKIES_KEY],
        }),
      )
      .forRoutes('*');
  }
}
