import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdatePublisherBodyDto {
  @IsInt()
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    title: 'Identyfikator',
    example: 1,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    title: 'Nazwa',
    maxLength: 250,
    nullable: false,
  })
  readonly name: string;
}
