import { JwtAuthGuard } from '@/modules/auth/guards';
import { RemoveUserCommand } from '@/modules/users/commands';
import {
  FindUserParamsDto,
  FindUserResultDto,
  FindUsersResultDto,
  RemoveUserParamsDto,
} from '@/modules/users/dto';
import {
  FindUserQuery,
  FindUserResult,
  FindUsersQuery,
  FindUsersResult,
} from '@/modules/users/queries';
import { BaseController } from '@/shared/base.controller';
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController extends BaseController {
  @ApiOperation({ summary: 'Pobieranie użytkowników' })
  @ApiOkResponse({
    type: FindUsersResultDto,
    description: 'Znalezieni użytkownicy',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<FindUsersResultDto> {
    const query = new FindUsersQuery();
    const result = await this.executeQuery<FindUsersResult>(query);

    return result.users;
  }

  @ApiOperation({ summary: 'Pobieranie użytkownika' })
  @ApiOkResponse({
    type: FindUserResultDto,
    description: 'Znaleziony użytkownik',
  })
  @ApiBadRequestResponse({ description: 'Użytkownik nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params: FindUserParamsDto): Promise<FindUserResultDto> {
    const query = new FindUserQuery(params.id);
    const result = await this.executeQuery<FindUserResult>(query);

    return result.user;
  }

  @ApiOperation({ summary: 'Usuwanie użytkownika' })
  @ApiOkResponse({ description: 'Użytkownik został pomyślnie usunięty' })
  @ApiBadRequestResponse({ description: 'Użytkownik nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param() params: RemoveUserParamsDto) {
    const command = new RemoveUserCommand(params.id);

    await this.executeCommand<void>(command);
  }
}