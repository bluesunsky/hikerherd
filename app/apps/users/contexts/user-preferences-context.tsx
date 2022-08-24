import type { Currency, WeightUnit, Language } from "db";

import { createContext } from "react";

type UserPreferencesContext = {
  weightUnit: WeightUnit;
  toggleWeightUnits: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

const userPreferencesContext = createContext<UserPreferencesContext>(
  {} as UserPreferencesContext
);

export default userPreferencesContext;
