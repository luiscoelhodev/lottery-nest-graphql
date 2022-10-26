import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GraphQLError } from 'graphql';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) { }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  createBets(@Args('createBetInput', { type: () => [CreateBetInput] }) createBetInput: CreateBetInput[], @Context() context) {
    if (context.req.user.error) {
      return new GraphQLError(context.req.user.error, {
        extensions: {
          code: 'BAD_REQUEST'
        }
      });
    }
    return context.req.user.roleTypes.includes('player') ? 
          this.betsService.create(context.req.user.id, createBetInput) : 
          new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => [Bet], { name: 'bets' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.betsService.findAll() :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => Bet, { name: 'bet' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.betsService.findOne(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Bet)
  @UseGuards(JwtAuthGuard)
  updateBet(@Args('updateBetInput') updateBetInput: UpdateBetInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.betsService.update(updateBetInput.id, updateBetInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Bet)
  @UseGuards(JwtAuthGuard)
  removeBet(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.betsService.remove(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }
}
