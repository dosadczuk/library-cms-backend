import { EntityNotFoundError } from 'typeorm';
import { File } from '@/modules/files/entities/file.entity';

export class FileNotFoundError extends EntityNotFoundError {
  constructor(criteria: any) {
    super(File, criteria);
  }
}
