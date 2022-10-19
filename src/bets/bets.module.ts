import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';

@Module({
  providers: [BetsResolver, BetsService]
})
export class BetsModule {}
