import { Author } from '@/modules/books/entities';
import { randomNumber } from '@/utils/random';
import { faker, Gender } from '@faker-js/faker';

export const AuthorSeed: Author[] = Array.from({ length: 200 }, (_, i) => {
  const gender = i % 3 === 0 ? Gender.female : Gender.male;

  const author = new Author();
  author.id = i + 1;
  author.firstName = faker.name.firstName(gender);
  author.lastName = faker.name.lastName(gender);

  return author;
});

export const getRandomAuthor = (): Author => {
  return AuthorSeed.at(randomNumber(AuthorSeed.length - 1, 0));
};

export const getRandomAuthors = (): Author[] => {
  const count = randomNumber(3, 1);

  const authors = new Map<number, Author>();
  for (let i = 0; i < count; i++) {
    let author: Author;

    do {
      author = getRandomAuthor();
    } while (authors.has(author.id));

    authors.set(author.id, author);
  }

  return Array.from(authors.values());
};
