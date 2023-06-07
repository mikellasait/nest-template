/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { ValidRoles } from '../enums/valid-roles.enum';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'No users inside req, make sure AuthGuard is applied',
      );
    }

    if (roles.length === 0) return user;

    console.log(roles);
    console.log(user.roles);

    for (const role of roles) {
      if (user.roles.includes(role)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `User: ${user.fullName} need a valid role [${roles}]`,
    );
  },
);
