import { CreateCopy } from '@/modules/books/dto';
import { Copy } from '@/modules/books/entities';
import { CopiesService } from '@/modules/books/services/copies.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('book/:id')
export class BookController {
  constructor(private readonly copiesService: CopiesService) {}

  @Get('copies')
  findCopies(@Param('id') id: string): Promise<Copy[]> {
    return this.copiesService.findByBook(id);
  }

  @Post('copies')
  createCopy(@Param('id') id: string, @Body() data: CreateCopy): Promise<Copy> {
    return this.copiesService.create(id, data);
  }
}
