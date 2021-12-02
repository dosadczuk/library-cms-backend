import { Genre } from '@/modules/books/entities/genre.entity';
import { getRandomNumber } from '@/utils/random';

type IGenre = Partial<Genre>;

const genres: string[] = [
  'horror',
  'thriller',
  'komedia',
  'kryminalny',
  'dokumentalny',
  'akcja',
  'dramatyczny',
  'edukacyjny',
];

export const getRandomGenre = (): IGenre => {
  const idx = getRandomNumber(genres.length - 1);

  return {
    id: idx + 1,
    value: genres[idx],
  };
};

export const GenreSeed: IGenre[] = genres.map((genre, i) => {
  return {
    id: i + 1,
    value: genre,
  };
});
