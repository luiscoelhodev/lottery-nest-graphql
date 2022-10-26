import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  createCart(@Args('createCartInput') createCartInput: CreateCartInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.cartService.create(createCartInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => [Cart], { name: 'carts' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return context.req.user.roleTypes.includes('admin') || context.req.user.roleTypes.includes('player') ?
           this.cartService.findAll() :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => Cart, { name: 'cart' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') || context.req.user.roleTypes.includes('player') ?
           this.cartService.findOne(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.cartService.update(updateCartInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  removeCart(@Context() context) {
    return context.req.user.roleTypes.includes('admin') ?
           this.cartService.remove() :
           new ForbiddenException('You are not authorized to perform this request.')
  }
}
