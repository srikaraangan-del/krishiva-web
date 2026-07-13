import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextType {
  selectedLang: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  selectedLang: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('krishiva-lang') || 'en';
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: string) => {
    setSelectedLang(lang);
    localStorage.setItem('krishiva-lang', lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ selectedLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
