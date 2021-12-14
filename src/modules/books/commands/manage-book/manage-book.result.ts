import { CreateUpdateBookResultDto } from '@/modules/books/dto';

export abstract class ManageBookResult {
  constructor(readonly book: CreateUpdateBookResultDto) {}
}
