import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    title: 'Email',
    example: 'admin@example.pl',
    maxLength: 255,
    nullable: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Hasło',
    example: 'admin123',
    nullable: false,
  })
  password: string;
}

export class LoginResultDto {
  @ApiProperty({
    title: 'Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    nullable: false,
  })
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
