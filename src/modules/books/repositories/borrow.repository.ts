import { Borrow } from '@/modules/books/entities/borrow.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Borrow)
export class BorrowRepository extends Repository<Borrow> {}
