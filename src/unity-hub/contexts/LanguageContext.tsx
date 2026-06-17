import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'ar' | 'fr' | 'es' | 'zh' | 'ur';

// Language configuration
const LANGUAGE_CONFIG: Record<Language, { name: string; nativeName: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr' },
  es: { name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  zh: { name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  ur: { name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLanguageConfig: (lang?: Language) => { name: string; nativeName: string; dir: 'ltr' | 'rtl' };
  t: (key: string, lang?: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detector for user's preferred language
export const detectLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const userLang = navigator.language.split('-')[0].toLowerCase();
  const supportedLanguages: Language[] = ['en', 'ar', 'fr', 'es', 'zh', 'ur'];
  
  // Map browser languages to our supported ones
  const languageMap: Record<string, Language> = {
    en: 'en',
    ar: 'ar',
    fr: 'fr',
    es: 'es',
    zh: 'zh',
    ur: 'ur',
    'zh-cn': 'zh',
    'zh-tw': 'zh',
  };
  
  return languageMap[userLang] || supportedLanguages[0];
};

// Translations storage (will be populated by data files)
let translations: Record<Language, Record<string, string>> = {
  en: {},
  ar: {},
  fr: {},
  es: {},
  zh: {},
  ur: {},
};

// Function to load translations
export const loadTranslations = (newTranslations: Record<Language, Record<string, string>>) => {
  translations = { ...translations, ...newTranslations };
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('telstp-language') as Language | null;
      return saved || detectLanguage();
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('telstp-language', language);
    // Update document direction
    document.documentElement.dir = LANGUAGE_CONFIG[language].dir;
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const getLanguageConfig = (lang: Language = language) => LANGUAGE_CONFIG[lang];

  const t = (key: string, lang: Language = language): string => {
    return translations[lang]?.[key] || translations.en?.[key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    getLanguageConfig,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LANGUAGE_CONFIG };
