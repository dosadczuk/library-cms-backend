import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBookCopyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Numer',
    example: 'ABC123456789',
    maxLength: 50,
    nullable: false,
  })
  number: string;
}

export class CreateBookCopyResultDto {}
