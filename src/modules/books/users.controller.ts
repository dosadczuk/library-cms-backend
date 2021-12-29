import { JwtAuthGuard } from '@/modules/auth/guards';
import { FindUserBorrowsParamsDto, FindUserBorrowsResultDto } from '@/modules/books/dto';
import { FindUserBorrowsQuery, FindUserBorrowsResult } from '@/modules/books/queries';
import { BaseController } from '@/shared/base.controller';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('books/users')
export class UsersController extends BaseController {
  @ApiOperation({ summary: 'Pobieranie wypożyczeń użytkownika' })
  @ApiOkResponse({
    type: FindUserBorrowsResultDto,
    description: 'Znalezione wypożyczenia',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id/borrows')
  async findUserBorrows(
    @Param() params: FindUserBorrowsParamsDto,
  ): Promise<FindUserBorrowsResultDto> {
    const query = new FindUserBorrowsQuery(params.id);
    const result = await this.executeQuery<FindUserBorrowsResult>(query);

    return result.borrows;
  }
}
