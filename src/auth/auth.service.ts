import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
    return {
      token: 'jwt',
      user
    }
  }
}
