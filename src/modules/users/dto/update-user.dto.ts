import { UserViewModel } from '@/modules/users/vms';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    description: 'Identyfikator użytkownika',
    example: 1,
  })
  readonly id: number;
}

export class UpdateUserBodyDto {
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
