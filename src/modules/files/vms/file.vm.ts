import { ApiProperty } from '@nestjs/swagger';
import { File } from '@/modules/files/entities/file.entity';
import { Exclude } from 'class-transformer';

export class FileViewModel {
  @ApiProperty({
    title: 'Identyfikator',
  })
  readonly id: string;

  @Exclude()
  readonly path: string;

  @ApiProperty({
    title: 'Nazwa',
  })
  readonly name: string;

  @ApiProperty({
    title: 'Rozmiar w bajtach',
  })
  readonly size: number;

  @ApiProperty({
    title: 'Typ MIME',
  })
  readonly mime: string;

  @ApiProperty({
    title: 'Suma kontrolna',
  })
  readonly sha256: string;

  constructor(file: File) {
    this.id = file.id;
    this.path = file.path;
    this.name = file.name;
    this.size = file.size;
    this.mime = file.mime;
    this.sha256 = file.sha256;
  }
}
