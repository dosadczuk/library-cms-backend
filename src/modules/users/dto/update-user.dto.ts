import { Role } from '@/modules/users/entities/enums';
import { UserViewModel } from '@/modules/users/vms';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserBodyDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiPropertyOptional({
    title: 'Imię',
    example: 'Jan',
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
    example: 'Nowak',
    maxLength: 50,
    nullable: false,
  })
  lastName?: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Rola',
    example: Role.CUSTOMER,
    enum: Role,
  })
  role?: Role;
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
