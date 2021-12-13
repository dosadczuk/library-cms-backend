import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/modules/users/entities/enums/role.enum';
import {
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    IsOptional,
  } from 'class-validator';

  export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({
      title: 'Imie',
      example: 'Jan',
      minLength: 3,
      maxLength: 50,
      nullable: false,
    })
    firstName: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({
      title: 'Nazwisko',
      example: 'Nowak',
      minLength: 3,
      maxLength: 50,
      nullable: false,
    })
    lastName: string;

    @IsEmail()
    @IsOptional()
    @MinLength(5)
    @MaxLength(255)
    @ApiProperty({
      title: 'Email',
      example: 'jnowak@example.com',
      minLength: 5,
      maxLength: 255,
      nullable: false,
    })
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(255)
    @ApiProperty({
      title: 'Hasło',
      example: 'Password123',
      minLength: 8,
      maxLength: 255,
      nullable: false,
    })
    password: string;

    @IsEnum(Role)
    @IsOptional()
    @ApiProperty({
      title: 'Rola użytkownika',
      example: Role.CUSTOMER,
      enum: Role,
      nullable: false,
    })
    role: Role;
  }