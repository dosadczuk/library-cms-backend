import { PublishersFilter } from '@/modules/books/filters/publishers.filter';
import { PublishersService } from '@/modules/books/services/publishers.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  findAll(@Query() filter: PublishersFilter) {
    return this.publishersService.findAll(filter);
  }
}
