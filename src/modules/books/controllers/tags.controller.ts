import { TagsFilter } from '@/modules/books/filters/tags.filter';
import { TagsService } from '@/modules/books/services/tags.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Query() filter: TagsFilter) {
    return this.tagsService.findAll(filter);
  }
}
