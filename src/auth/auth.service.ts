import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthResponse } from './interfaces/auth-response.inteface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async signup(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserDto);

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Email or password does not match');

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with admin');

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
