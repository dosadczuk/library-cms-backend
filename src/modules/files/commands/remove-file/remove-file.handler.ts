import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveFileCommand } from '@/modules/files/commands/remove-file/remove-file.command';
import { FileRepository } from '@/modules/files/repositories/file.repository';
import { File } from '@/modules/files/entities/file.entity';
import { FileNotFoundError } from '@/modules/files/error/file-not-found.error';
import * as fs from 'fs';

@CommandHandler(RemoveFileCommand)
export class RemoveFileHandler implements ICommandHandler<RemoveFileCommand> {
  constructor(private readonly repository: FileRepository) {}

  async execute(command: RemoveFileCommand): Promise<any> {
    const file = await this.findFile(command);
    if (file == null) {
      throw new FileNotFoundError(command.fileId);
    }

    this.removeFileFromDisk(file);

    await this.repository.remove(file);
  }

  private async findFile(command: RemoveFileCommand): Promise<File | null> {
    return this.repository.findOne(command.fileId);
  }

  private removeFileFromDisk(file: File) {
    fs.unlinkSync(file.path);
  }
}
