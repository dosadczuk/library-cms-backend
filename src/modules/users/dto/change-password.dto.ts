import { UserViewModel } from '@/modules/users/vms';
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from '@/shared/utils/class-validator';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    description: 'Identyfikator użytkownika',
    example: 1,
  })
  readonly id: number;
}

export class ChangePasswordBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({
    title: 'Hasło',
    minLength: 8,
    maxLength: 32,
    nullable: false,
  })
  password: string;
}

export class ChangePasswordResultDto {
  @ApiProperty({
    title: 'Zmieniono hasło',
  })
  readonly user: UserViewModel;

  constructor(user: UserViewModel) {
    this.user = user;
  }
}
