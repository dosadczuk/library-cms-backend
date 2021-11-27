import { Tag } from '@/modules/books/entities/tag.entity';
import { getRandomNumber } from '@/utils/random';

const tags: string[] = [
  'historia',
  'dramat',
  'przygoda',
  'podróże',
  'komedia',
  'powieść',
  'XX wiek',
];

export const getRandomTag = (): Tag => {
  const idx = getRandomNumber(tags.length - 1);

  return {
    id: idx + 1,
    value: tags[idx],
  };
};

export const TagSeed: Tag[] = tags.map((tag, i) => {
  return {
    id: i + 1,
    value: tag,
  };
});
