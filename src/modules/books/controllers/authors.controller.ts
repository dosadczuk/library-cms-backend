import { AuthorsFilter } from '@/modules/books/filters/authors.filter';
import { AuthorsService } from '@/modules/books/services/authors.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(@Query() filter: AuthorsFilter) {
    return this.authorsService.findAll(filter);
  }
}
