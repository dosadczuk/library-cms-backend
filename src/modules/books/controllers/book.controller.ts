import { CreateCopy } from '@/modules/books/dto';
import { Copy } from '@/modules/books/entities';
import { CopiesService } from '@/modules/books/services/copies.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('book/:book_id')
@UseInterceptors(ClassSerializerInterceptor)
export class BookController {
  constructor(private readonly copiesService: CopiesService) {}

  @Get('copies')
  findCopies(@Param('book_id') bookId: string): Promise<Copy[]> {
    return this.copiesService.findByBook(bookId);
  }

  @Post('copies')
  createCopy(
    @Param('book_id') bookId: string,
    @Body() data: CreateCopy,
  ): Promise<Copy> {
    return this.copiesService.create(bookId, data);
  }

  @Delete('copy/:copy_id')
  removeCopy(
    @Param('book_id') bookId: string,
    @Param('copy_id') copyId: string,
  ) {
    return this.copiesService.remove(bookId, copyId);
  }
}
