import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, @InjectRepository(User) private usersRepository: Repository<User>, @InjectRepository(Role) private rolesRepository: Repository<Role>) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email)

    const isUserValid = await bcrypt.compare(password, user.password)

    if (isUserValid === true) {
      const { password, ...rest } = user
      return rest
    }
    return null
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }
    return {
      token: this.jwtService.sign(payload),
      user
    }
  }

  async updatePermission(updatePermissionInput: UpdatePermissionInput) {
    const user = await this.usersService.findOne(updatePermissionInput.id)
    user.roles = []
    user.roleTypes = ''
    await this.usersRepository.save(user)

    updatePermissionInput.roles.map(async (role) => {
      const roleTypeFound = await this.rolesRepository.findOneBy({ type: role })
      user.roles.push(roleTypeFound)
    })
    user.roleTypes = updatePermissionInput.roles.join(', ')
    
    return await this.usersRepository.save(user)
  }
}
