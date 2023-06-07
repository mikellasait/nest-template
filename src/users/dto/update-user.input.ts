import {
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsUUID,
  MinLength,
} from 'class-validator';

import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @MinLength(3)
  @IsOptional()
  fullName?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsStrongPassword()
  @IsOptional()
  password?: string;

  // @Field(() => Boolean, { nullable: true })
  // @IsBoolean()
  // @IsOptional()
  // isActive?: boolean;
}
