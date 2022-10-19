import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Mutation(() => Bet)
  createBet(@Args('createBetInput') createBetInput: CreateBetInput) {
    return this.betsService.create(createBetInput);
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
