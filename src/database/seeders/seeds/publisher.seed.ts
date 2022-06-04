import { Publisher } from '@/modules/books/entities';
import { randomNumber } from '@/utils/random';
import { faker } from '@faker-js/faker';

export const PublisherSeed: Publisher[] = Array.from({ length: 100 }, (_, i) => {
  const publisher = new Publisher();
  publisher.id = i + 1;
  publisher.name = faker.unique(faker.company.companyName, null, { maxRetries: 200 });

  return publisher;
});

export const getRandomPublisher = (): Publisher => {
  return PublisherSeed.at(randomNumber(PublisherSeed.length - 1, 0));
};
