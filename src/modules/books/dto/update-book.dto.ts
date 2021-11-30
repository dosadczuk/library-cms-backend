import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBook extends PartialType(CreateBook) {}
