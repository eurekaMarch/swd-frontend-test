import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import th from "./locales/th.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "th",
    debug: false,
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
