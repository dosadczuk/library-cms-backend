import { LanguagesFilter } from '@/modules/books/filters/languages.filter';
import { LanguagesService } from '@/modules/books/services/languages.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  findAll(@Query() filter: LanguagesFilter) {
    return this.languagesService.findAll(filter);
  }
}
