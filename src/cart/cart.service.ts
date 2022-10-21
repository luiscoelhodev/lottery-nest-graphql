import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) {}

  async create(createCartInput: CreateCartInput) {
    const cartAlreadyExists = await this.cartRepository.find()
    if (cartAlreadyExists.length >= 1) {
      return new BadRequestException('There already is an entry for cart, so you can only update it or delete it.')
    }
    const cart = this.cartRepository.create(createCartInput)
    return await this.cartRepository.save(cart);
  }

  async findAll() {
    return await this.cartRepository.find()
  }

  findOne(id: number) {
    const cart = this.cartRepository.findOneOrFail({ where: { id }})
    return cart;
  }

  async update(updateCartInput: UpdateCartInput) {
    const cart = await this.cartRepository.findOne({ where: {} })
    this.cartRepository.merge(cart, updateCartInput)
    return await this.cartRepository.save(cart);
  }

  async remove() {
    const cart = await this.cartRepository.findOne({ where: {} })
    const copyOfCart = { ...cart }
    await this.cartRepository.remove(cart)
    return copyOfCart;
  }
}
