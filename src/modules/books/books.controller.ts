import { BooksService } from '@/modules/books/books.service';
import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { UpdateBook } from '@/modules/books/dto/update-book.dto';
import { BooksFilter } from '@/modules/books/filters/books.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() data: CreateBook) {
    return this.booksService.create(data);
  }

  @Put()
  update(@Body() data: UpdateBook) {
    return this.booksService.update(data);
  }

  @Get()
  findAll(@Query() filter: BooksFilter) {
    return this.booksService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
