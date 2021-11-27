import { Publisher } from '@/modules/books/entities/publisher.entity';
import { getRandomNumber } from '@/utils/random';

const publishers: Omit<Publisher, 'id'>[] = [
  {
    name: 'Tajfuny',
    createdAt: new Date(),
  },
  {
    name: 'Wydawnictwo Czarne',
    createdAt: new Date(),
  },
  {
    name: 'Wydawnictwo Karakter',
    createdAt: new Date(),
  },
  {
    name: 'Wydawnictwo w Podwórku',
    createdAt: new Date(),
  },
  {
    name: 'Krytyka Polityczna',
    createdAt: new Date(),
  },
  {
    name: 'Big Book Cafe',
    createdAt: new Date(),
  },
];

export const getRandomPublisher = (): Publisher => {
  const idx = getRandomNumber(publishers.length - 1);

  return Object.assign({ id: idx + 1 }, publishers[idx]);
};

export const PublisherSeed: Publisher[] = publishers.map((publisher, i) => {
  return {
    id: i + 1,
    name: publisher.name,
    createdAt: publisher.createdAt,
  };
});
