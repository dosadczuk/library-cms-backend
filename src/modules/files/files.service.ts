import { UploadFile } from '@/modules/files/dto/upload-file.dto';
import { File } from '@/modules/files/entities/file.entity';
import { FileNotFoundError } from '@/modules/files/errors/file-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import * as fs from 'fs';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
  ) {}

  async find(id: string): Promise<File> {
    const file = await this.filesRepository.findOne(id);
    if (file == null) {
      throw new FileNotFoundError(id);
    }

    return file;
  }

  save(data: UploadFile): Promise<File> {
    const file = data.toEntity();
    file.checksum = this.computeChecksum(file.path);

    return this.filesRepository.save(file);
  }

  private computeChecksum(filepath: string): string {
    const contents = fs.readFileSync(filepath);

    const sha1 = createHash('sha1');
    sha1.update(contents);

    return sha1.digest('hex');
  }

  async remove(id: string) {
    const file = await this.filesRepository.findOne(id);
    if (file == null) {
      throw new FileNotFoundError(id);
    }

    fs.unlinkSync(file.path);

    return this.filesRepository.delete(id);
  }
}
