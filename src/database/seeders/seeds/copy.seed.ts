import { Copy } from '@/modules/books/entities';

const samples: Partial<Copy>[] = [
  {
    number: 'ABC12345678',
    bookId: 1,
  },
  {
    number: 'DAC93836662',
    bookId: 2,
  },
  {
    number: 'BDS32387878',
    bookId: 3,
  },
  {
    number: 'KRE32737777',
    bookId: 4,
  },
  {
    number: 'ERM83264846',
    bookId: 5,
  },
  {
    number: 'MWE73636478',
    bookId: 6,
  },
  {
    number: 'WLD98347466',
    bookId: 7,
  },
  {
    number: 'MDF83467462',
    bookId: 8,
  },
  {
    number: 'GRU23475678',
    bookId: 9,
  },
  {
    number: 'GYE85475990',
    bookId: 10,
  },
];

export const CopySeed: Copy[] = samples.map((it, idx) => {
  const copy = new Copy();
  copy.id = idx + 1;
  copy.number = it.number;
  copy.bookId = it.bookId;

  return copy;
});
