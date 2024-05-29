import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./localization/en.json";
import de from "./localization/de.json";
import fr from "./localization/fr.json";

export const namespace = "testing";

export const initAppI18n = () => {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: "en",
      detection: { order: ["navigator"] },
      resources: {}
    });

  i18next.addResourceBundle("en", namespace, en);
  i18next.addResourceBundle("de", namespace, de);
  i18next.addResourceBundle("fr", namespace, fr);
};

export default initAppI18n;
