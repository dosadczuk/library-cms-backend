import { Language } from '@/modules/books/entities';
import { randomNumber } from '@/utils/random';

const samples = [
  'polski',
  'angielski',
  'niemiecki',
  'francuski',
  'hiszpański',
  'chiński',
  'japoński',
];

export const LanguageSeed: Language[] = samples.map((v, i) => {
  const language = new Language();
  language.id = i + 1;
  language.value = v;

  return language;
});

export const getRandomLanguage = (): Language => {
  return LanguageSeed.at(randomNumber(LanguageSeed.length - 1, 0));
};
