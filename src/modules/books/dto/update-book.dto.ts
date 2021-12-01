import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { METADATA } from '@/modules/books/entities/book.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBook extends PartialType(CreateBook) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    title: METADATA.id.title,
  })
  id: number;
}
