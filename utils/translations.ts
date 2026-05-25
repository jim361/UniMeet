import { ContentLanguage, contentLanguageLabels } from '@/store/languageStore';

export function getTranslationLabel(language: ContentLanguage) {
  return contentLanguageLabels[language];
}

export function translatedText(
  translations: Partial<Record<ContentLanguage, string>>,
  language: ContentLanguage,
) {
  return translations[language] ?? translations.en ?? '';
}

export function translatedList(
  translations: Partial<Record<ContentLanguage, string[]>>,
  language: ContentLanguage,
) {
  return translations[language] ?? translations.en ?? [];
}
