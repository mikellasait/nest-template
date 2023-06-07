import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, UsersModule],
})
export class SeedModule {}
