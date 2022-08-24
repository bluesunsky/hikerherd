import type { FC } from "react";

import { useEffect, useState } from "react";

import i18n from "app/i18n";

import { Language, WeightUnit, Currency } from "db";

import useCurrentUser from "../hooks/use-current-user";
import userPreferencesContext from "../contexts/user-preferences-context";
type Props = {
  children?: React.ReactNode;
};
const UserPreferencesProvider: FC<Props> = ({ children }) => {
  const user = useCurrentUser({ suspense: false });

  const [weightUnit, setWeightUnit] = useState<WeightUnit>(
    user?.weightUnit || WeightUnit.METRIC
  );

  const [currency, setCurrency] = useState<Currency>(
    user?.currency || Currency.USD
  );

  const [language, changeLanguage] = useState<Language>(
    user?.language || Language.EN
  );

  useEffect(() => {
    if (user?.weightUnit) setWeightUnit(user.weightUnit);
    if (user?.currency) setCurrency(user.currency);
    if (user?.language) setLanguage(user.language);
  }, [user]);

  const toggleWeightUnits = () => {
    const newWeightUnit =
      weightUnit === WeightUnit.METRIC
        ? WeightUnit.IMPERIAL
        : WeightUnit.METRIC;

    setWeightUnit(newWeightUnit);
  };

  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <userPreferencesContext.Provider
      value={{
        weightUnit,
        toggleWeightUnits,
        currency,
        setCurrency,
        language,
        setLanguage,
      }}
    >
      {children}
    </userPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
