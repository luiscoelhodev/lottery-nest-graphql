import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(@InjectRepository(Game) private gamesRepository: Repository<Game>) {}

  async create(createGameInput: CreateGameInput) {
    const game = this.gamesRepository.create(createGameInput)
    return await this.gamesRepository.save(game);
  }

  findAll() {
    return this.gamesRepository.find();
  }

  async findOne(id: number) {
    const game = await this.gamesRepository.findOneOrFail({ where: { id }})
    return game;
  }

  async update(id: number, updateGameInput: UpdateGameInput) {
    const gameFound = await this.gamesRepository.findOneOrFail({ where: { id } })
    this.gamesRepository.merge(gameFound, updateGameInput)
    return await this.gamesRepository.save(gameFound);
  }

  async remove(id: number) {
    try {
      const gameToBeDeleted = await this.gamesRepository.findOneOrFail({ where: { id } })
      const copyOfGameToBeDeletedToBeUsedAsReturnType = { ...gameToBeDeleted }
      await this.gamesRepository.remove(gameToBeDeleted)
      return copyOfGameToBeDeletedToBeUsedAsReturnType
    } catch (error) {
      return new NotFoundException('This game was not found to be deleted!')
    }
  }
}
