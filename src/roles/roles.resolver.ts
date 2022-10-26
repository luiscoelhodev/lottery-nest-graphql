import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.rolesService.create(createRoleInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => [Role], { name: 'roles' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.rolesService.findAll() :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Query(() => Role, { name: 'role' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.rolesService.findOne(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.rolesService.update(updateRoleInput.id, updateRoleInput) :
           new ForbiddenException('You are not authorized to perform this request.')
  }

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  removeRole(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return context.req.user.roleTypes.includes('admin') ? 
           this.rolesService.remove(id) :
           new ForbiddenException('You are not authorized to perform this request.')
  }
}
