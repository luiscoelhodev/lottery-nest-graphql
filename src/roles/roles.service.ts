import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {}

  async create(createRoleInput: CreateRoleInput) {
    const role = this.rolesRepository.create(createRoleInput);
    return await this.rolesRepository.save(role);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    return await this.rolesRepository.findOneOrFail({where: { id }});
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    const role = await this.rolesRepository.findOneOrFail({where: { id }});
    this.rolesRepository.merge(role, updateRoleInput)
    return await this.rolesRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOneOrFail({where: {id}})
    return await this.rolesRepository.remove(role);
  }
}
