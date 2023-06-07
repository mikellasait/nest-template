import { InputType } from '@nestjs/graphql';
import {
  IsString,
  IsStrongPassword,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
