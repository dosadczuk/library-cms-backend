import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
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
  Post,
  Param,
  Req,
  Body,
  UseGuards,
  UseInterceptors,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@/modules/auth/roles.decorator';
import { Role } from '@/modules/users/entities/enums';
import { UpdateUserBodyDto, UpdateUserResultDto } from '@/modules/users/dto/update-user.dto';
import { UpdateUserCommand, UpdateUserResult } from './commands/update-user';
import { User } from './entities';
import { Console } from 'console';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController extends BaseController {
  @ApiOperation({
    summary: 'Pobieranie użytkowników',
    description: `Wymagane role: ${Role.ADMIN}, ${Role.EMPLOYEE}`,
  })
  @ApiOkResponse({
    type: FindUsersResultDto,
    description: 'Znalezieni użytkownicy',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get()
  async findAll(): Promise<FindUsersResultDto> {
    const query = new FindUsersQuery();
    const result = await this.executeQuery<FindUsersResult>(query);

    return result.users;
  }

  @ApiOperation({
    summary: 'Pobieranie użytkownika',
    description: `Wymagane role: ${Role.ADMIN}, ${Role.EMPLOYEE}`,
  })
  @ApiOkResponse({
    type: FindUserResultDto,
    description: 'Znaleziony użytkownik',
  })
  @ApiBadRequestResponse({ description: 'Użytkownik nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get(':id')
  async findOne(@Param() params: FindUserParamsDto): Promise<FindUserResultDto> {
    const query = new FindUserQuery(params.id);
    const result = await this.executeQuery<FindUserResult>(query);

    return result.user;
  }

  @ApiOperation({ summary: 'Zmiana danych użytkownika' })
  @ApiOkResponse({
    type: UpdateUserResultDto,
    description: 'Dane zostały pomyślnie zmienione',
  })
  @ApiBadRequestResponse({ description: 'Nie udało się zmienić danych użytkownika' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Put(':id')
  async register(@Body() user: UpdateUserBodyDto, @Req() request): Promise<UpdateUserResultDto> {
    const currentUser = request.user;
    console.log(currentUser);
    if (currentUser.id != user.id && currentUser.role != Role.ADMIN) {
      throw new UnauthorizedException();
    }
    const command = new UpdateUserCommand(user);
    const result = await this.executeCommand<UpdateUserResult>(command);

    return result.user;
  }

  @ApiOperation({ summary: 'Usuwanie użytkownika', description: `Wymagane role: ${Role.ADMIN}` })
  @ApiOkResponse({ description: 'Użytkownik został pomyślnie usunięty' })
  @ApiBadRequestResponse({ description: 'Użytkownik nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async removeUser(@Param() params: RemoveUserParamsDto) {
    const command = new RemoveUserCommand(params.id);

    await this.executeCommand<void>(command);
  }
}
