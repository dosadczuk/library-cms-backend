import { FileViewModel } from '@/modules/files/vms';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResultDto {
  @ApiProperty({
    title: 'Wgrany plik',
  })
  readonly file: FileViewModel;

  constructor(file: FileViewModel) {
    this.file = file;
  }
}
