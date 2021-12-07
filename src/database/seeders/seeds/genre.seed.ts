import { Genre } from '@/modules/books/entities/genre.entity';
import { randomNumber } from '@/utils/random';

const samples: string[] = [
  'horror',
  'thriller',
  'komedia',
  'kryminalny',
  'dokumentalny',
  'akcja',
  'dramatyczny',
  'edukacyjny',
];

export const GenreSeed: Genre[] = samples.map((it, idx) => {
  const genre = new Genre();
  genre.id = idx + 1;
  genre.value = it;

  return genre;
});

export const randomGenre = (): Genre => {
  const idx = randomNumber(samples.length - 1, 0);

  const genre = new Genre();
  genre.id = idx + 1;
  genre.value = samples[idx];

  return genre;
};
