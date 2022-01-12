import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
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
import { Roles } from '@/modules/auth/roles.decorator';
import { Role } from '@/modules/users/entities/enums';

@ApiTags('books')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('books/users')
export class UsersController extends BaseController {
  @ApiOperation({
    summary: 'Pobieranie wypożyczeń użytkownika',
    description: `Metoda pozwala na pobranie wypożyczonych przez użytkownika egzemplarzy książek. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    type: FindUserBorrowsResultDto,
    description: 'Znalezione wypożyczenia',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Get('/:id/borrows')
  async findUserBorrows(
    @Param() params: FindUserBorrowsParamsDto,
  ): Promise<FindUserBorrowsResultDto> {
    const query = new FindUserBorrowsQuery(params.id);
    const result = await this.executeQuery<FindUserBorrowsResult>(query);

    return result.borrows;
  }
}
