import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) { }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  createBets(@Args('createBetInput', { type: () => [CreateBetInput] }) createBetInput: CreateBetInput[], @Context() context) {
    return context.req.user.roleTypes.includes('player') ? 
          this.betsService.create(createBetInput) : 
          new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => [Bet], { name: 'bets' })
  findAll() {
    return this.betsService.findAll();
  }

  @Query(() => Bet, { name: 'bet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.betsService.findOne(id);
  }

  @Mutation(() => Bet)
  updateBet(@Args('updateBetInput') updateBetInput: UpdateBetInput) {
    return this.betsService.update(updateBetInput.id, updateBetInput);
  }

  @Mutation(() => Bet)
  removeBet(@Args('id', { type: () => Int }) id: number) {
    return this.betsService.remove(id);
  }
}
