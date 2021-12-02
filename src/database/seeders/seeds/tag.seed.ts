import { Tag } from '@/modules/books/entities/tag.entity';
import { getRandomNumber } from '@/utils/random';

type ITag = Partial<Tag>;

const tags: string[] = [
  'historia',
  'dramat',
  'przygoda',
  'podróże',
  'komedia',
  'powieść',
  'XX wiek',
];

export const TagSeed: ITag[] = tags.map((tag, i) => {
  return {
    id: i + 1,
    value: tag,
  };
});

export const getRandomTag = (): ITag => {
  const idx = getRandomNumber(tags.length - 1);

  return {
    id: idx + 1,
    value: tags[idx],
  };
};

export const getRandomTags = (): ITag[] => {
  const count = getRandomNumber(5, 2);

  const tags: ITag[] = [];
  for (let i = 0; i < count; i++) {
    let tag = getRandomTag();

    while (tags.find((it) => it.id === tag.id)) {
      tag = getRandomTag();
    }

    tags.push(tag);
  }

  return tags;
};
