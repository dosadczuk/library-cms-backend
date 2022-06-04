import { Genre } from '@/modules/books/entities';
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

export const GenreSeed: Genre[] = samples.map((v, i) => {
  const genre = new Genre();
  genre.id = i + 1;
  genre.value = v;

  return genre;
});

export const getRandomGenre = (): Genre => {
  return GenreSeed.at(randomNumber(GenreSeed.length - 1, 0));
};
