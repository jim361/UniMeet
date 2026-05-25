import { create } from 'zustand';

export type UiLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'vi';
export type ContentLanguage = 'en' | 'ja' | 'zh' | 'vi';

type LanguageState = {
  uiLanguage: UiLanguage;
  contentLanguage: ContentLanguage;
  contentTranslationEnabled: boolean;
  setUiLanguage: (language: UiLanguage) => void;
  setContentLanguage: (language: ContentLanguage) => void;
  setContentTranslationEnabled: (enabled: boolean) => void;
};

export const uiLanguageLabels: Record<UiLanguage, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
  vi: 'Tiếng Việt',
};

export const contentLanguageLabels: Record<ContentLanguage, string> = {
  en: 'English',
  ja: '日本語',
  zh: '中文',
  vi: 'Tiếng Việt',
};

export const useLanguageStore = create<LanguageState>((set) => ({
  uiLanguage: 'ko',
  contentLanguage: 'en',
  contentTranslationEnabled: true,
  setUiLanguage: (uiLanguage) => set({ uiLanguage }),
  setContentLanguage: (contentLanguage) => set({ contentLanguage }),
  setContentTranslationEnabled: (contentTranslationEnabled) =>
    set({ contentTranslationEnabled }),
}));
