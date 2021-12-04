import { CreateUpdateBookResultDto } from '@/modules/books/dto/create-update-book.dto';

export abstract class ManageBookResult {
  constructor(public readonly book: CreateUpdateBookResultDto) {}
}
