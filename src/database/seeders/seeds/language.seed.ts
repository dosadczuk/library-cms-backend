import { Language } from '@/modules/books/entities/language.entity';
import { randomNumber } from '@/utils/random';

const samples: string[] = [
  'polski',
  'angielski',
  'niemiecki',
  'francuski',
  'hiszpański',
  'chiński',
  'japoński',
];

export const LanguageSeed: Language[] = samples.map((it, idx) => {
  const language = new Language();
  language.id = idx + 1;
  language.value = it;

  return language;
});

export const randomLanguage = (): Language => {
  const idx = randomNumber(samples.length - 1, 0);

  const language = new Language();
  language.id = idx + 1;
  language.value = samples[idx];

  return language;
};
