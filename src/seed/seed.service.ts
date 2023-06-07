import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_USERS } from './data/seed-data';

@Injectable()
export class SeedService {
  private isProduction: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.isProduction = this.configService.get('STATE') === 'prod';
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProduction) {
      throw new UnauthorizedException(
        'Seed can only be executed at development environmet',
      );
    }

    await this.deleteDatabase();

    await this.loadUsers();

    return true;
  }

  private async deleteDatabase() {
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  private async loadUsers() {
    const users = [];

    for (const user of SEED_USERS) {
      users.push(this.usersRepository.create(user));
    }

    await this.usersRepository.save(users);
  }
}
