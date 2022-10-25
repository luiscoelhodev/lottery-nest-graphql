import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { LoginResponse } from './entities/login-response';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginCredentials', { type: () => LoginUserInput }) _loginCredentials: LoginUserInput, @Context() context) {
    return this.authService.login(context.user)
  }

  @Mutation(() => User)
  updatePermission(@Args('updatePermissionInput', { type: () => UpdatePermissionInput }) updatePermissionInput: UpdatePermissionInput) {
    return this.authService.updatePermission(updatePermissionInput)
  }

}
