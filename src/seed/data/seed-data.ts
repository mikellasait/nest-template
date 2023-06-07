/* eslint-disable prettier/prettier */
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';


export const SEED_USERS: User[] = [
  {
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    password: 'password123',
    roles: [ValidRoles.user],
  },
  {
    email: 'jane.smith@example.com',
    fullName: 'Jane Smith',
    password: 'secret789',
    roles: [ValidRoles.user],
  },
  {
    email: 'alex.wilson@example.com',
    fullName: 'Alex Wilson',
    password: 'qwerty456',
    roles: [ValidRoles.superUser],
  },
  {
    email: 'emma.jones@example.com',
    fullName: 'Emma Jones',
    password: 'password987',
    roles: [ValidRoles.superUser],
  },
  {
    email: 'michael.brown@example.com',
    fullName: 'Michael Brown',
    password: 'mypass123',
    roles: [ValidRoles.superUser, ValidRoles.admin],
  },
  {
    email: 'sarah.johnson@example.com',
    fullName: 'Sarah Johnson',
    password: 'sarahpass',
    roles: [ValidRoles.admin],
  },
  {
    email: 'david.wilson@example.com',
    fullName: 'David Wilson',
    password: 'davidpass',
    roles: [ValidRoles.user],
  },
  {
    email: 'olivia.davis@example.com',
    fullName: 'Olivia Davis',
    password: 'oliviapass',
    roles: [ValidRoles.user],
  },
];
