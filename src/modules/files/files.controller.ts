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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() data) {
    const file = await this.filesService.save(data);

    return file.id;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res) {
    const file = await this.filesService.find(id);

    res.set({
      'Content-Type': file.mime,
      'Content-Length': file.size,
    });

    return new StreamableFile(createReadStream(file.path));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.filesService.remove(id);
  }
}
