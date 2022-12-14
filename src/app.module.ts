import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { BetsModule } from './bets/bets.module';
import { CartModule } from './cart/cart.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, GamesModule, BetsModule, CartModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    driver: ApolloDriver
  }), AuthModule, RolesModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
