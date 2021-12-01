import { CONSTRAINTS } from '@/modules/books/entities/constraints/publisher.constraints';
import { METADATA } from '@/modules/books/entities/metadata/publisher.metadata';
import { Publisher as Entity } from '@/modules/books/entities/publisher.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrUpdatePublisher {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    title: METADATA.id.title,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(CONSTRAINTS.name.maxLength)
  @ApiProperty({
    example: 'Tajfuny',
    title: METADATA.name.title,
    maxLength: CONSTRAINTS.name.maxLength,
    nullable: CONSTRAINTS.name.nullable,
  })
  name: string;

  toEntity(): Entity {
    const publisher = new Entity();
    publisher.id = this.id;
    publisher.name = this.name;

    return publisher;
  }
}
