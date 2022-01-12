import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
import { RemoveUserCommand } from '@/modules/users/commands';
import { User as UserEntity } from '@/modules/users/entities';
import {
  FindUserParamsDto,
  FindUserResultDto,
  FindUsersResultDto,
  RemoveUserParamsDto,
  UpdateUserParamsDto,
} from '@/modules/users/dto';
import {
  FindUserQuery,
  FindUserResult,
  FindUsersQuery,
  FindUsersResult,
} from '@/modules/users/queries';
import { BaseController } from '@/shared/base.controller';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UnauthorizedException,
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
import { Roles } from '@/modules/auth/roles.decorator';
import { Role } from '@/modules/users/entities/enums';
import { UpdateUserBodyDto, UpdateUserResultDto } from '@/modules/users/dto/update-user.dto';
import { UpdateUserCommand, UpdateUserResult } from './commands/update-user';
import { User } from '@/modules/users/user.decorator';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController extends BaseController {
  @ApiOperation({
    summary: 'Pobieranie użytkowników',
    description: `Metoda pozwala na pobranie wszystkich użytkowników. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
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
    description: `Metoda pozwala na pobranie danego użytkownika. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
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

  @ApiOperation({
    summary: 'Modyfikowanie użytkownika',
    description: `Metoda pozwala na zaktualizowanie danych użytkownika. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    type: UpdateUserResultDto,
    description: 'Dane zostały pomyślnie zmienione',
  })
  @ApiBadRequestResponse({ description: 'Nie udało się zmienić danych użytkownika' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Put(':id')
  async updateUser(
    @Param() params: UpdateUserParamsDto,
    @Body() user: UpdateUserBodyDto,
    @User() auth: UserEntity,
  ): Promise<UpdateUserResultDto> {
    if (auth.id !== params.id && auth.role !== Role.ADMIN) {
      throw new UnauthorizedException(); // zwykły użytkownik może zmieniać tylko swoje dane
    }

    const command = new UpdateUserCommand(params.id, user);
    const result = await this.executeCommand<UpdateUserResult>(command);

    return result.user;
  }

  @ApiOperation({
    summary: 'Usuwanie użytkownika',
    description: `Metoda pozwala na usunięcie użytkownika. Wymagane role: ${Role.ADMIN}.`,
  })
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
