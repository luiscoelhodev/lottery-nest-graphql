import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { CreateRoleInput } from 'src/roles/dto/create-role.input';
import { Role } from 'src/roles/entities/role.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>, @InjectRepository(Game) private gamesRepository: Repository<Game>, @InjectRepository(User) private usersRepository: Repository<User>) {}

  async seedDatabase() {
    const adminRoleObject: CreateRoleInput = {
      type: 'admin',
      description: 'Can perform (almost) any action.'
    }

    const playerRoleObject: CreateRoleInput = {
      type: 'player',
      description: 'Can perform some actions.'
    }

    const adminRole = this.rolesRepository.create(adminRoleObject)
    const playerRole = this.rolesRepository.create(playerRoleObject)
    await this.rolesRepository.save(adminRole)
    await this.rolesRepository.save(playerRole)

    const adminRoleFound = await this.rolesRepository.findOneBy({ type: 'admin' })
    const playerRoleFound = await this.rolesRepository.findOneBy({ type: 'player' })

    const adminUserObject: CreateUserInput = {
      name: 'Administrator',
      cpf: '111.111.111-11',
      email: 'admin@email.com',
      password: '123456'
    }
    const playerUserObject: CreateUserInput = {
      name: 'Player',
      cpf: '111.111.111-12',
      email: 'player@email.com',
      password: '123456'
    }
    const adminUser = this.usersRepository.create({
      name: adminUserObject.name, 
      cpf: adminUserObject.cpf, 
      email: adminUserObject.email, 
      password: adminUserObject.password, 
      roles: [adminRoleFound], 
      roleTypes: 'admin' 
    })
    const playerUser = this.usersRepository.create({
      name: playerUserObject.name, 
      cpf: playerUserObject.cpf, 
      email: playerUserObject.email, 
      password: playerUserObject.password, 
      roles: [playerRoleFound], 
      roleTypes: 'player' 
    })

    await this.usersRepository.save(adminUser)
    await this.usersRepository.save(playerUser)

    return 'DB was seeded successfully!'

  }
}
