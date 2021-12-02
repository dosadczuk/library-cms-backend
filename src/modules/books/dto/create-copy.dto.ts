import { Copy as Entity } from '@/modules/books/entities/copy.entity';
import { CONSTRAINTS, METADATA } from '@/modules/books/entities/copy.props';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCopy {
  @IsString()
  @MaxLength(CONSTRAINTS.number.maxLength)
  @ApiProperty({
    example: 'ABC123456789',
    title: METADATA.number.title,
    maxLength: CONSTRAINTS.number.maxLength,
    nullable: CONSTRAINTS.number.nullable,
  })
  number: string;

  toEntity(): Entity {
    const copy = new Entity();
    copy.number = this.number;

    return copy;
  }
}
