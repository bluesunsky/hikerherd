import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common_fr from "i18n/FR/resource.json";
import common_en from "i18n/EN/resource.json";

i18n.use(initReactI18next).init({
  fallbackLng: "EN",
  debug: true,
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "EN", // language to use
  resources: {
    EN: {
      translation: common_en, // 'common' is our custom namespace
    },
    FR: {
      translation: common_fr,
    },
  },
});
export default i18n;
