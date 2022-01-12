import { UserViewModel } from '@/modules/users/vms';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserBodyDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator użytkownika',
    example: 1,
  })
  readonly id: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiPropertyOptional({
    title: 'Imię',
    example: 'Adam',
    maxLength: 50,
    nullable: false,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiPropertyOptional({
    title: 'Nazwisko',
    example: 'Kowalski',
    maxLength: 50,
    nullable: false,
  })
  lastName?: string;

  // @IsEnum(Role)
  // @IsOptional()
  // @ApiPropertyOptional({
  //   title: 'Rola',
  //   example: Role.CUSTOMER,
  //   enum: Role,
  // })
  // role?: Role;
}

export class UpdateUserResultDto {
  @ApiProperty({
    title: 'Zmodyfikowany użytkownik',
  })
  readonly user: UserViewModel;

  constructor(user: UserViewModel) {
    this.user = user;
  }
}
