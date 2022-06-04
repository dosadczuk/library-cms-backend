import { User } from '@/modules/users/entities';
import { Role } from '@/modules/users/entities/enums';
import { randomNumber } from '@/utils/random';
import { faker, Gender } from '@faker-js/faker';

export const UserSeed: User[] = Array.from({ length: 400 }, (_, i) => {
  const gender = i % 3 === 0 ? Gender.female : Gender.male;

  const user = new User();
  user.id = i + 1;
  user.firstName = faker.name.firstName(gender);
  user.lastName = faker.name.lastName(gender);
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = faker.internet.password(randomNumber(12, 8), true);
  user.role = randomUserRole();

  return user;
});

export const getRandomUser = (): User => {
  return UserSeed.at(randomNumber(UserSeed.length - 1, 0));
};

function randomUserRole(): Role {
  const roles = Object.values(Role);
  const randomIdx = randomNumber(roles.length - 1, 0);

  return roles[randomIdx] as Role;
}
