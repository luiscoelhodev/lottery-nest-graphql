import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, @InjectRepository(Role) private rolesRepository: Repository<Role>) {}

  async create(createUserInput: CreateUserInput) {
    const playerRole = await this.rolesRepository.findOneByOrFail({ type: 'player' })
    
    const user = this.usersRepository.create({
      name: createUserInput.name,
      cpf: createUserInput.cpf,
      email: createUserInput.email,
      password: createUserInput.password,
      roleTypes: 'player',
      roles: [playerRole]
    })
    
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({ relations: {bets: true, roles: true }});
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id }, relations: { bets: true, roles: true } })
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByOrFail({ email })
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.findOneOrFail({ where: { id }, relations: { bets: true, roles: true }})
    this.usersRepository.merge(user, updateUserInput)

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    try {
      const userFound = await this.usersRepository.findOneOrFail({ where: { id }, relations: { bets: true, roles: true }})
      const copyOfUserFoundToBeUsedAsReturnType = { ...userFound }
      await this.usersRepository.remove(userFound)
      return copyOfUserFoundToBeUsedAsReturnType
    } catch (error) {
      return new NotFoundException('User not found to be deleted!')
    }
  }

  async myUserAccount(id: number) {
    return await this.usersRepository.findOneOrFail({ where: { id }, relations: {bets: true, roles: true} })
  }

  async updateMyAccount(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.findOneOrFail({ where: { id }, relations: {bets: true, roles: true} })
    this.usersRepository.merge(user, updateUserInput)
    return await this.usersRepository.save(user)
  }

  async deleteMyAccount(id: number) {
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id }, relations: { bets: true, roles: true } })
      const copyOfUserFound = { ...user }
      await this.usersRepository.remove(user)
      return copyOfUserFound      
    } catch (error) {
      return new NotFoundException('User not found to be deleted!')
    }

  }
}
