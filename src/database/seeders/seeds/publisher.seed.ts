import { Publisher } from '@/modules/books/entities/publisher.entity';
import { randomNumber } from '@/utils/random';

const samples: string[] = [
  'Tajfuny',
  'Wydawnictwo Czarne',
  'Wydawnictwo Karakter',
  'Wydawnictwo w Podwórku',
  'Krytyka Polityczna',
  'Big Book Cafe',
];

export const PublisherSeed: Publisher[] = samples.map((it, idx) => {
  const publisher = new Publisher();
  publisher.id = idx + 1;
  publisher.name = it;

  return publisher;
});

export const randomPublisher = (): Publisher => {
  const idx = randomNumber(samples.length - 1, 0);

  const publisher = new Publisher();
  publisher.id = idx + 1;
  publisher.name = samples[idx];

  return publisher;
};
