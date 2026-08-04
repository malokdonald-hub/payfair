import contentPL from '../../data/content.pl.json';
import contentEN from '../../data/content.en.json';
import contentUK from '../../data/content.uk.json';
import contentRU from '../../data/content.ru.json';

const contentMap = {
  pl: contentPL,
  en: contentEN,
  uk: contentUK,
  ru: contentRU,
};

export function getContent(locale: string = 'pl') {
  return contentMap[locale as keyof typeof contentMap] || contentPL;
}