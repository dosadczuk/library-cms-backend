import { Borrow } from '@/modules/books/entities';

const sample: Partial<Borrow>[] = [
  {
    dateFrom: new Date(2021, 12, 20, 12, 20),
    copyId: 1,
    userId: 1,
  },
  {
    dateFrom: new Date(2021, 12, 13, 12, 10),
    copyId: 2,
    userId: 1,
  },
  {
    dateFrom: new Date(2021, 12, 20, 20, 4),
    copyId: 3,
    userId: 1,
  },
];

export const BorrowSeed: Borrow[] = sample.map((it, idx) => {
  const borrow = new Borrow();
  borrow.id = idx + 1;
  borrow.dateFrom = it.dateFrom;
  borrow.copyId = it.copyId;
  borrow.userId = it.userId;

  return borrow;
});
