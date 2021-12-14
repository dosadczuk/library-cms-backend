import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdateAuthorBodyDto {
  @IsInt()
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    title: 'Identyfikator',
    example: 1,
    nullable: true,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Imię',
    example: 'Jan',
    maxLength: 50,
    nullable: false,
  })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Nazwisko',
    example: 'Kowalski',
    maxLength: 50,
    nullable: false,
  })
  readonly lastName: string;
}
