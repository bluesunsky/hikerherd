import type { FC } from "react";

import {
  useEffect,
  useState,
  //useContext
} from "react";
import { useMutation } from "blitz";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import i18n from "app/i18n";

import { Language, WeightUnit, Currency } from "db";

import useCurrentUser from "../hooks/use-current-user";
import updateLanguageMutation from "../mutations/update-language-mutation";
type Props = {
  children?: React.ReactNode;
};
const UserPreferencesProvider: FC<Props> = ({ children }) => {
  const user = useCurrentUser({ suspense: false });
  const [updateLanguage] = useMutation(updateLanguageMutation);
  //const { setLanguage } = useContext(userPreferencesContext);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(
    user?.weightUnit || WeightUnit.METRIC
  );

  const [currency, setCurrency] = useState<Currency>(
    user?.currency || Currency.USD
  );

  var userlanguage = user?.language;
  if (!userlanguage) {
    switch (i18n.language) {
      case "EN":
        userlanguage = Language.EN;
        break;
      case "ES":
        userlanguage = Language.ES;
        break;
      case "FR":
        userlanguage = Language.FR;
        break;
      case "IT":
        userlanguage = Language.IT;
        break;
      case "US":
        userlanguage = Language.US;
        break;
      default:
        console.log(user?.language, i18n.language);
        userlanguage = Language.EN;
    }
  }

  const [language, changeLanguage] = useState<Language>(userlanguage);

  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
    localStorage.setItem("lng", language);

    if (user) {
      const values = {
        language: language,
      };
      try {
        return updateLanguage(values);
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  useEffect(() => {
    if (user?.weightUnit) setWeightUnit(user.weightUnit);
    if (user?.currency) setCurrency(user.currency);
    if (user?.language) setLanguage(user.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleWeightUnits = () => {
    const newWeightUnit =
      weightUnit === WeightUnit.METRIC
        ? WeightUnit.IMPERIAL
        : WeightUnit.METRIC;

    setWeightUnit(newWeightUnit);
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
