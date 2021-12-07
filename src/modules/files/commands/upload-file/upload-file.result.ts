import { UploadFileResultDto } from '@/modules/files/dto/upload-file.dto';

export class UploadFileResult {
  constructor(readonly file: UploadFileResultDto) {}
}
