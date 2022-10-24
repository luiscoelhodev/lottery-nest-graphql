import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ValidateUser } from './dto/validate-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  async validateUser(@Args('validateUserObject', { type: () => ValidateUser }) validateUserObject: ValidateUser) {
    return this.authService.validateUser(validateUserObject);
  }
}
