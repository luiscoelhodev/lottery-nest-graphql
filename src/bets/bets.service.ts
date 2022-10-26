import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  constructor(@InjectRepository(Bet) private betsRepository: Repository<Bet>, @InjectRepository(Game) private gamesRepository: Repository<Game>, @InjectRepository(User) private usersRepository: Repository<User>, @InjectRepository(Cart) private cartRepository: Repository<Cart>) {}

  async create(userId: number | number, createBetInput: CreateBetInput[]) {

    const cart = await this.cartRepository.find()
    const minCartValue = cart[0].minCartValue
    let totalCartPrice: number = 0

    await Promise.all(    
      createBetInput.map(async (bet) => {
      const game = await this.gamesRepository.findOneByOrFail({type: bet.gameType})
      totalCartPrice += Number(game.price)
    }))

    if (totalCartPrice < minCartValue) {
      return new BadRequestException(`Minimum cart price must be R$${minCartValue}!`)
    }
    await Promise.all(
      createBetInput.map(async (bet) => {
        const user = await this.usersRepository.findOneOrFail({ where: { id: userId } })
        const game = await this.gamesRepository.findOneByOrFail( { type: bet.gameType } )
        const newBet = this.betsRepository.create({ user, game, numbers: bet.numbers })

        await this.betsRepository.save(newBet)
      })
    )
    return 'All bets were saved successfully!';
  }

  async findAll() {
    return this.betsRepository.find();
  }

  async findOne(id: number) {
    return await this.betsRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateBetInput: UpdateBetInput) {
    const betFound = await this.betsRepository.findOneOrFail({ where: { id }, relations: { user: true, game: true }})
    this.betsRepository.merge(betFound, updateBetInput);
    return await this.betsRepository.save(betFound);
  }

  async remove(id: number) {
    try {
      const betFound = await this.betsRepository.findOneOrFail({ where: { id } })
      const copyOfBetFound = {...betFound}
      await this.betsRepository.remove(betFound)
      return copyOfBetFound
      
    } catch (error) {
      return new NotFoundException('Could not find any bet with this id provided.')
    }
  }
}
