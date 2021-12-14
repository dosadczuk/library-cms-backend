import { File } from '@/modules/files/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class FileViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: '7d1c7f69-2f65-40a2-b9bf-5099269e167d',
  })
  readonly id: string;

  @Exclude()
  readonly path: string;

  @ApiProperty({
    title: 'Nazwa',
    example: 'sample_image.jpeg',
  })
  readonly name: string;

  @ApiProperty({
    title: 'Rozmiar w bajtach',
    example: 123000,
  })
  readonly size: number;

  @ApiProperty({
    title: 'Typ MIME',
    example: 'image/jpeg',
  })
  readonly mime: string;

  @ApiProperty({
    title: 'Suma kontrolna',
    example: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
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
