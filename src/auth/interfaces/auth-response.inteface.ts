/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';

export interface AuthResponse {
  token: string;

  user: User;
}
