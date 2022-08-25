import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";

import common_fr from "i18n/FR/resource.json";
import common_en from "i18n/EN/resource.json";

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // order and from where user language should be detected
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: "myDomain",

      // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
      cookieOptions: { path: "/", sameSite: "strict" },
    },
    fallbackLng: "EN",
    debug: true,
    interpolation: { escapeValue: false }, // React already does escaping
    //lng: "EN", // language to use
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
