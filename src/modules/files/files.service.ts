import { File as Entity, File } from '@/modules/files/entities/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
  ) {}

  async find(id: string): Promise<File> {
    const file = await this.filesRepository.findOne(id);
    if (file == null) {
      throw new EntityNotFoundError(File, id); // FIXME: Dedykowany EX
    }

    return file;
  }

  save(data: Express.Multer.File): Promise<File> {
    const file = new Entity();
    file.name = data.originalname;
    file.path = data.path;
    file.size = data.size;
    file.mime = data.mimetype;

    return this.filesRepository.save(file);
  }

  async remove(id: string) {
    const file = await this.filesRepository.findOne(id);
    if (file == null) {
      throw new EntityNotFoundError(File, id); // FIXME: Dedykowany EX
    }

    fs.unlinkSync(file.path);

    return this.filesRepository.delete(id);
  }
}
