import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  @UseGuards(JwtAuthGuard)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.gamesService.create(createGameInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => [Game], { name: 'games' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return context.req.user.roleTypes.includes('admin') || context.req.user.roleTypes.includes('player') ?
           this.gamesService.findAll() :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => Game, { name: 'game' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.gamesService.findOne(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Game)
  @UseGuards(JwtAuthGuard)
  updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.gamesService.update(updateGameInput.id, updateGameInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Game)
  @UseGuards(JwtAuthGuard)
  removeGame(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.gamesService.remove(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }
}
