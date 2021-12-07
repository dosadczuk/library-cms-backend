import { Tag } from '@/modules/books/entities/tag.entity';
import { randomNumber } from '@/utils/random';

const samples: string[] = [
  'historia',
  'dramat',
  'przygoda',
  'podróże',
  'komedia',
  'powieść',
  'XX wiek',
];

export const TagSeed: Tag[] = samples.map((it, idx) => {
  const tag = new Tag();
  tag.id = idx + 1;
  tag.value = it;

  return tag;
});

export const randomTag = (): Tag => {
  const idx = randomNumber(samples.length - 1, 0);

  const tag = new Tag();
  tag.id = idx + 1;
  tag.value = samples[idx];

  return tag;
};

export const randomTags = (): Tag[] => {
  const count = randomNumber(5, 2);

  const tags: Tag[] = [];
  for (let idx = 0; idx < count; idx++) {
    let tag = randomTag();
    while (tags.find((it) => it.id === tag.id)) {
      tag = randomTag();
    }

    tags.push(tag);
  }

  return tags;
};
