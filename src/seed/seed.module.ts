import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Game, Role, Cart])],
  providers: [SeedService, SeedResolver]
})
export class SeedModule {}
