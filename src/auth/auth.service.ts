import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { ValidateUser } from './dto/validate-user.input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(validateUserObject: ValidateUser) {
    const user = await this.usersService.findOneByEmail(validateUserObject.email);
    const isUserValid = await bcrypt.compare(validateUserObject.password, user.password)
    
    return isUserValid;
  }
}
