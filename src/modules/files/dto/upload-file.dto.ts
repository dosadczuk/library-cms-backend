import { File as Entity } from '@/modules/files/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFile {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: Express.Multer.File;

  toEntity(): Entity {
    const file = new Entity();
    file.name = this.file.originalname;
    file.path = this.file.path;
    file.size = this.file.size;
    file.mime = this.file.mimetype;

    return file;
  }
}
