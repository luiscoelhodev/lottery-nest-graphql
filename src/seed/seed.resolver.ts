import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}
  
  @Mutation(() => String)
  seed() {
    return this.seedService.seedDatabase()
  }
}
