import { Role } from '@/modules/users/entities/enums/role.enum';
import { User } from '@/modules/users/entities/user.entity';
import { randomNumber } from '@/utils/random';

const samples: Partial<User>[] = [
  {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@example.pl',
    password: 'admin123',
    role: Role.ADMIN,
  },
  {
    firstName: 'Customer',
    lastName: 'Customer',
    email: 'customer@example.pl',
    password: 'customer123',
    role: Role.CUSTOMER,
  },
  {
    firstName: 'Employee',
    lastName: 'Employee',
    email: 'employee@example.pl',
    password: 'employee123',
    role: Role.EMPLOYEE,
  },
];

export const UserSeed: Promise<User[]> = Promise.all(
  samples.map(async (it, idx) => {
    const user = new User();
    user.id = idx + 1;
    user.firstName = it.firstName;
    user.lastName = it.lastName;
    user.email = it.email;
    user.password = it.password;
    user.role = it.role;

    return user;
  }),
);

export const randomUser = async (): Promise<User> => {
  const idx = randomNumber(samples.length - 1, 0);
  const data = samples[idx];

  const user = new User();
  user.id = idx + 1;
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.password = data.password;
  user.role = data.role;

  return user;
};
