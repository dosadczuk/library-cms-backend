import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BaseController } from '@/shared/base.controller';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileResultDto } from '@/modules/files/dto';
import {
  RemoveFileCommand,
  UploadFileCommand,
  UploadFileResult,
} from '@/modules/files/commands';
import { FindFileQuery, FindFileResult } from '@/modules/files/queries';
import { createReadStream } from 'fs';

@ApiOkResponse({
  type: UploadFileResultDto,
  description: 'Plik został pomyślnie wgrany',
})
@ApiTags('files')
@Controller('files')
export class FilesController extends BaseController {
  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res) {
    const query = new FindFileQuery(id);
    const result = await this.executeQuery<FindFileResult>(query);

    res.set({
      'Content-Type': result.fileMime,
      'Content-Length': result.fileSize,
    });

    return new StreamableFile(createReadStream(result.filePath));
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const command = new UploadFileCommand(file);
    const result = await this.executeCommand<UploadFileResult>(command);

    return result.file;
  }

  @Delete(':id')
  async removeFile(@Param('id') id: string) {
    const command = new RemoveFileCommand(id);

    await this.executeCommand<void>(command);
  }
}
