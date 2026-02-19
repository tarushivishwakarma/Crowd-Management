import { useState } from 'react';
import { Language, getTranslation } from '../utils/translations';

export const useLanguage = (initialLanguage: Language = 'en') => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  const t = (key: string) => getTranslation(language, key);
  
  return {
    language,
    setLanguage,
    t
  };
};