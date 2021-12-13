import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/modules/users/entities/enums/role.enum';
import {
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
  } from 'class-validator';
  import { User as Entity } from '@/modules/users/entities/user.entity';
// import { use } from 'passport';

  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
    @ApiProperty({
      title: 'Rola użytkownika',
      example: Role.CUSTOMER,
      enum: Role,
      nullable: false,
    })
    role: Role;

    toEntity(): Entity {
      const user = new Entity();
      user.firstName = this.firstName;
      user.lastName = this.lastName;
      user.email = this.email;
      user.role = this.role;

      return user;
    }
  }