import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  constructor(@InjectRepository(Bet) private betsRepository: Repository<Bet>, @InjectRepository(Game) private gamesRepository: Repository<Game>, @InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createBetInput: CreateBetInput[]) {
    await Promise.all(
      createBetInput.map(async (bet) => {
        const user = await this.usersRepository.findOneOrFail({ where: { id: bet.userId } })
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

  findOne(id: number) {
    return `This action returns a #${id} bet`;
  }

  update(id: number, updateBetInput: UpdateBetInput) {
    return `This action updates a #${id} bet`;
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}
