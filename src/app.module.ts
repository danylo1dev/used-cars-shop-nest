import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import ormConfig from './config/typeorm.config';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3308,
        username: 'root',
        password: 'password',
        database: 'nest-used-car',
        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
