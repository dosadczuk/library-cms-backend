import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBook extends PartialType(CreateBook) {}
