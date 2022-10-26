import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { LoginResponse } from './entities/login-response';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginCredentials', { type: () => LoginUserInput }) _loginCredentials: LoginUserInput, @Context() context) {
    return this.authService.login(context.user)
  }

  @Mutation(() => User || String)
  @UseGuards(JwtAuthGuard)
  updatePermission(@Args('updatePermissionInput', { type: () => UpdatePermissionInput }) updatePermissionInput: UpdatePermissionInput, @Context() context) {
    if (context.req.user.error) {
      return new GraphQLError(context.req.user.error, {
        extensions: {
          code: 'BAD_REQUEST'
        }
      });
    }
    return context.req.user.roleTypes.includes('admin') ? 
           this.authService.updatePermission(updatePermissionInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

}
