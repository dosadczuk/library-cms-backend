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

export class CheckCredentialsDto {
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
}
