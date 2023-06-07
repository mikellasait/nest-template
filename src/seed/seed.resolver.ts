import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, {
    name: 'executeSeed',
    description: 'This populates the database for development',
  })
  executeSeed(): Promise<boolean> {
    return this.seedService.executeSeed();
  }
}
