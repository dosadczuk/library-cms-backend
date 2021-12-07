import { RemoveFileHandler } from '@/modules/files/commands/remove-file';
import { UploadFileHandler } from '@/modules/files/commands/upload-file';

export * from '@/modules/files/commands/remove-file';
export * from '@/modules/files/commands/upload-file';

export const CommandHandlers = [RemoveFileHandler, UploadFileHandler];
