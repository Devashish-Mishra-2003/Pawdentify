// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import hi from './locales/hi.json';
// Add other languages as you create them:
// import hi from './locales/hi.json';
// import fr from './locales/fr.json';

// Supported languages configuration
export const supportedLanguages = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिंदी' },
  fr: { name: 'French', nativeName: 'Français' },
  es: { name: 'Spanish', nativeName: 'Español' },
  de: { name: 'German', nativeName: 'Deutsch' },
};

// Translation resources
const resources = {
  en: {
    translation: en,
  },
  // Uncomment as you add translation files:
   hi: {
    translation: hi,
   }
  // fr: {
  //   translation: fr,
  // },
  // es: {
  //   translation: es,
  // },
  // de: {
  //   translation: de,
  // },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Use English if detected language is not available
    supportedLngs: Object.keys(resources), // Only allow languages we have translations for
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false, // Prevents conflicts with your existing Suspense setup
    },
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Keys or params to lookup language from
      caches: ['localStorage'], // Cache user language preference
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;


