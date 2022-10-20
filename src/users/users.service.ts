import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRepository.create(createUserInput)
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } })
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } })
    this.usersRepository.merge(user, updateUserInput)

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    try {
      const userFound = await this.usersRepository.findOneOrFail({ where: { id }})
      return this.usersRepository.remove(userFound)
    } catch (error) {
      return new NotFoundException('User not found to be deleted!')
    }
  }
}
