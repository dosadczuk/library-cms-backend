import { UserViewModel } from '@/modules/users/vms';
import { Role } from '@/modules/users/entities/enums';
import { IsInt, IsNotEmpty, IsEnum } from '@/shared/utils/class-validator';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    description: 'Identyfikator użytkownika',
    example: 1,
  })
  readonly id: number;
}

export class ChangeRoleBodyDto {
  @IsEnum(Role)
  @ApiProperty({
    title: 'Rola',
    example: Role.CUSTOMER,
    default: Role.CUSTOMER,
    enum: Role,
  })
  role: Role = Role.CUSTOMER;
}

export class ChangeRoleResultDto {
  @ApiProperty({
    title: 'Zmodyfikowany użytkownik',
  })
  readonly user: UserViewModel;

  constructor(user: UserViewModel) {
    this.user = user;
  }
}
