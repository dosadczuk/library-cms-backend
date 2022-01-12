import { UserViewModel } from '@/modules/users/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    description: 'Identyfikator użytkownika',
    example: 1,
  })
  readonly id: number;
}

export class FindUserResultDto {
  @ApiProperty({
    title: 'Znaleziony użytkownik',
  })
  readonly user: UserViewModel;

  constructor(user: UserViewModel) {
    this.user = user;
  }
}
