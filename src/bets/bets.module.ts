import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Game, User])],
  providers: [BetsResolver, BetsService]
})
export class BetsModule {}
