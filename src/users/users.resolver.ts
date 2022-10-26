import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context){
    return context.req.user.roleTypes.includes('admin') ? 
           this.usersService.findAll() :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.usersService.findOne(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  myUserAccount(@Context() context) {
    return this.usersService.myUserAccount(context.req.user.id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  findOneByEmail(@Args('email') email: string, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.usersService.findOneByEmail(email) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.usersService.update(updateUserInput.id, updateUserInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateMyAccount(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Context() context) {
    return this.usersService.updateMyAccount(context.req.user.id, updateUserInput)
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  removeUser(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.usersService.remove(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  deleteMyAccount(@Context() context) {
    return this.usersService.deleteMyAccount(context.req.user.id)
  }
}
