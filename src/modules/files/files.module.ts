import { CommandHandlers } from '@/modules/files/commands';
import { FilesController } from '@/modules/files/files.controller';
import { QueryHandlers } from '@/modules/files/queries';
import { Repositories } from '@/modules/files/repositories';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';

@Module({
  imports: [
    CqrsModule,
    MulterModule.register({
      dest: path.join(process.cwd(), 'uploads'),
    }),
  ],
  controllers: [FilesController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Repositories],
})
export class FilesModule {}
