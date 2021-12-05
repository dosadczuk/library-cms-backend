import { ApiProperty } from '@nestjs/swagger';
import { FileViewModel } from '@/modules/files/vms/file.vm';

export class UploadFileResultDto {
  @ApiProperty({
    title: 'Wgrany plik',
  })
  readonly file: FileViewModel;

  constructor(file: FileViewModel) {
    this.file = file;
  }
}
