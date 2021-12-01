import { GenresFilter } from '@/modules/books/filters/genres.filter';
import { GenresService } from '@/modules/books/services/genres.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(@Query() filter: GenresFilter) {
    return this.genresService.findAll(filter);
  }
}
