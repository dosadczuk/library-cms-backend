import { UploadFileResult } from '@/modules/files/commands';
import { UploadFileCommand } from '@/modules/files/commands/upload-file/upload-file.command';
import { UploadFileResultDto } from '@/modules/files/dto';
import { File } from '@/modules/files/entities/file.entity';
import { FileRepository } from '@/modules/files/repositories/file.repository';
import { FileViewModel } from '@/modules/files/vms/file.vm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createHash } from 'crypto';
import * as fs from 'fs';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler
  implements ICommandHandler<UploadFileCommand, UploadFileResult>
{
  constructor(private readonly repository: FileRepository) {}

  async execute(command: UploadFileCommand): Promise<UploadFileResult> {
    const file = this.createFile(command);

    await this.repository.persist(file);

    const result = new UploadFileResultDto(new FileViewModel(file));

    return new UploadFileResult(result);
  }

  private createFile(command: UploadFileCommand): File {
    const { file: uploadedFile } = command;

    const file = new File();
    file.name = uploadedFile.originalname;
    file.path = uploadedFile.path;
    file.size = uploadedFile.size;
    file.mime = uploadedFile.mimetype;
    file.sha256 = this.sha256(uploadedFile.path);

    return file;
  }

  private sha256(filePath: string): string {
    const contents = fs.readFileSync(filePath);

    const sha256 = createHash('sha256');
    sha256.update(contents);

    return sha256.digest('hex');
  }
}
