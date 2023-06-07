/* eslint-disable prettier/prettier */
import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  superUser = 'superUser',
  user = 'user',
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
