import { Injectable } from '@nestjs/common';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';

@Injectable()
export class BetsService {
  create(createBetInput: CreateBetInput) {
    return 'This action adds a new bet';
  }

  findAll() {
    return `This action returns all bets`;
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
