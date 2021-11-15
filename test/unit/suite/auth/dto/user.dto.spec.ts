import { UserDto } from '@/auth/dto/user.dto';

describe('UserDto', () => {
  it('should be defined', () => {
    expect(new UserDto()).toBeDefined();
  });
});
