import { Publisher } from '@/modules/books/entities/publisher.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUpdatePublisherDto {
  @IsInt()
  @IsOptional()
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
  name: string;
}

export class CreateUpdatePublisherResultDto {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Nazwa',
  })
  readonly name: string;

  constructor(publisher: Publisher) {
    this.id = publisher.id;
    this.name = publisher.name;
  }
}
