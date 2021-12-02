import { Language } from '@/modules/books/entities/language.entity';
import { getRandomNumber } from '@/utils/random';

type ILanguage = Partial<Language>;

const languages: string[] = [
  'polski',
  'angielski',
  'niemiecki',
  'francuski',
  'hiszpański',
  'chiński',
  'japoński',
];

export const getRandomLanguage = (): ILanguage => {
  const idx = getRandomNumber(languages.length - 1);

  return {
    id: idx + 1,
    value: languages[idx],
  };
};

export const LanguageSeed: ILanguage[] = languages.map((language, i) => {
  return {
    id: i + 1,
    value: language,
  };
});
