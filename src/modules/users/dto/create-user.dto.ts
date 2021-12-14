import { Role } from '@/modules/users/entities/enums';
import { UserViewModel } from '@/modules/users/vms';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Imię',
    example: 'Jan',
    maxLength: 50,
    nullable: false,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Nazwisko',
    example: 'Nowak',
    maxLength: 50,
    nullable: false,
  })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    title: 'Adres e-mail',
    example: 'jnowak@example.com',
    maxLength: 255,
    nullable: false,
  })
  email: string;

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

  @IsEnum(Role)
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Rola',
    example: Role.CUSTOMER,
    default: Role.CUSTOMER,
    enum: Role,
  })
  role: Role = Role.CUSTOMER;
}

export class CreateUserResultDto {
  @ApiProperty({
    title: 'Utworzony użytkownik',
  })
  readonly user: UserViewModel;

  constructor(user: UserViewModel) {
    this.user = user;
  }
}
