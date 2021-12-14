import { UserViewModel } from '@/modules/users/vms';
import { ApiProperty } from '@nestjs/swagger';

export class FindUsersResultDto {
  @ApiProperty({
    title: 'Znalezieni użytkownicy',
    type: [UserViewModel],
  })
  readonly users: UserViewModel[];

  constructor(users: UserViewModel[]) {
    this.users = users;
  }
}
