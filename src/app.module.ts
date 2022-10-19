import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { BetsModule } from './bets/bets.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, GamesModule, BetsModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
