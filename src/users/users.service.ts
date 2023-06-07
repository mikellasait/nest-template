import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { PaginationArgs } from 'src/common/dto/args';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      });

      await this.userRepository.save(newUser);
      delete newUser.password;

      return newUser;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<User[]> {
    const { limit, offset } = paginationArgs;

    const users = await this.userRepository.find({ take: limit, skip: offset });

    return users;
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`User with email ${id} not found`);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const user = await this.userRepository.preload({
        ...updateUserInput,
        id,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async block(id: string): Promise<User> {
    const userToBlock = await this.findOneById(id);

    userToBlock.isActive = false;

    return await this.userRepository.save(userToBlock);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
