import { UploadFile } from '@/modules/files/dto/upload-file.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() data: UploadFile, @Req() req) {
    if (req.file == null) {
      throw new BadRequestException('No file to upload');
    }

    // trzeba przypisać ręcznie
    data.file = req.file;

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
