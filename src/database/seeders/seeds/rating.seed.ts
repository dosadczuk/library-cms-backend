import { Rating } from '@/modules/books/entities';

const samples: Partial<Rating>[] = [
  {
    bookId: 1,
    userId: 1,
    value: '5',
    comment: 'Polecam!1!!!',
  },
  {
    bookId: 1,
    userId: 2,
    value: '4',
  },
  {
    bookId: 1,
    userId: 3,
    value: '4.5',
  },
  {
    bookId: 2,
    userId: 1,
    value: '4',
  },
  {
    bookId: 2,
    userId: 2,
    value: '4',
  },
  {
    bookId: 2,
    userId: 3,
    value: '2.5',
    comment: 'Bez komentarza',
  },
  {
    bookId: 3,
    userId: 1,
    value: '4',
  },
  {
    bookId: 3,
    userId: 2,
    value: '2',
    comment: 'Nie polecam !!!',
  },
];

export const RatingSeed: Rating[] = samples.map((it, idx) => {
  const rating = new Rating();
  rating.id = idx + 1;
  rating.bookId = it.bookId;
  rating.userId = it.userId;
  rating.value = it.value;
  rating.comment = it.comment;

  return rating;
});
