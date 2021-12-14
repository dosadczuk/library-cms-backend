import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    title: 'Email',
    example: 'jnowak@example.com',
    maxLength: 255,
    nullable: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Hasło',
    example: 'P@ssword123',
    nullable: false,
  })
  password: string;
}

export class LoginResultDto {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
