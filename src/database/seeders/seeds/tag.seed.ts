import { Tag } from '@/modules/books/entities';
import { randomNumber } from '@/utils/random';
import { faker } from '@faker-js/faker';

export const TagSeed: Tag[] = Array.from({ length: 150 }, (_, i) => {
  const tag = new Tag();
  tag.id = i + 1;
  tag.value = faker.unique(faker.word.verb, null, { maxRetries: 300 });

  return tag;
});

export const getRandomTag = (): Tag => {
  return TagSeed.at(randomNumber(TagSeed.length - 1, 0));
};

export const getRandomTags = (): Tag[] => {
  const count = randomNumber(5, 2);

  const tags = new Map<number, Tag>();
  for (let i = 0; i < count; i++) {
    let tag: Tag;

    do {
      tag = getRandomTag();
    } while (tags.has(tag.id));

    tags.set(tag.id, tag);
  }

  return Array.from(tags.values());
};
