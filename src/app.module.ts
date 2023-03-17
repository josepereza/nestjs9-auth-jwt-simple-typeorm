import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
     UsersModule,
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '03266Jpa',
      database: 'user_blog',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
