import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadFileCommand } from '@/modules/files/commands/upload-file/upload-file.command';
import { FileRepository } from '@/modules/files/repositories/file.repository';
import { UploadFileResultDto } from '@/modules/files/dto';
import { FileViewModel } from '@/modules/files/vms/file.vm';
import { UploadFileResult } from '@/modules/files/commands';
import { File } from '@/modules/files/entities/file.entity';
import * as fs from 'fs';
import { createHash } from 'crypto';

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
    file.checksum = this.calculateSha256(uploadedFile.path);

    return file;
  }

  private calculateSha256(filePath: string): string {
    const contents = fs.readFileSync(filePath);

    const sha256 = createHash('sha256');
    sha256.update(contents);

    return sha256.digest('hex');
  }
}
