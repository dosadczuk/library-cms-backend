import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
import { RemoveFileCommand, UploadFileCommand, UploadFileResult } from '@/modules/files/commands';
import { FindFileParamsDto, RemoveFileParamsDto, UploadFileResultDto } from '@/modules/files/dto';
import { FindFileQuery, FindFileResult } from '@/modules/files/queries';
import { BaseController } from '@/shared/base.controller';
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Roles } from '@/modules/auth/roles.decorator';
import { Role } from '@/modules/users/entities/enums';

@ApiTags('files')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('files')
export class FilesController extends BaseController {
  @ApiOperation({ summary: 'Pobieranie pliku' })
  @ApiOkResponse({ description: 'Zawartość pliku' })
  @ApiBadRequestResponse({ description: 'Plik nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params: FindFileParamsDto, @Res({ passthrough: true }) res) {
    const query = new FindFileQuery(params.id);
    const result = await this.executeQuery<FindFileResult>(query);

    res.set({
      'Content-Type': result.fileMime,
      'Content-Length': result.fileSize,
    });

    return new StreamableFile(createReadStream(result.filePath));
  }

  @ApiOperation({
    summary: 'Wgrywanie pliku',
    description: `Wymagane role: ${Role.ADMIN}, ${Role.EMPLOYEE}`,
  })
  @ApiOkResponse({
    type: UploadFileResultDto,
    description: 'Plik został pomyślnie wgrany',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const command = new UploadFileCommand(file);
    const result = await this.executeCommand<UploadFileResult>(command);

    return result.file;
  }

  @ApiOperation({ summary: 'Usuwanie pliku', description: `Wymagane role: ${Role.ADMIN}` })
  @ApiOkResponse({ description: 'Plik został pomyślnie usunięty' })
  @ApiBadRequestResponse({ description: 'Plik nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async removeFile(@Param() params: RemoveFileParamsDto) {
    const command = new RemoveFileCommand(params.id);

    await this.executeCommand<void>(command);
  }
}
