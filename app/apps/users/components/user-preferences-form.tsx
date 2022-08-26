import type { BlitzPage } from "blitz";

import { useMutation } from "blitz";
import { Fragment, useContext } from "react";

import { useToast } from "@chakra-ui/toast";
import { FORM_ERROR } from "final-form";
import { useTranslation } from "react-i18next";

import SimpleForm from "app/components/forms/components/simple-form";
import SelectField from "app/components/forms/components/select-field";
import TextField from "app/components/forms/components/text-field";
import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";

import { Currency, WeightUnit, Language } from "db";

import useCurrentUser from "../hooks/use-current-user";
import updatePreferencesSchema from "../schemas/update-preferences-schema";
import updatePreferencesMutation from "../mutations/update-preferences-mutation";
const UserPreferencesForm: BlitzPage = () => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const toast = useToast();
  const [updatePreferences] = useMutation(updatePreferencesMutation);
  const { setLanguage } = useContext(userPreferencesContext);

  return (
    <SimpleForm
      schema={updatePreferencesSchema}
      initialValues={{
        weightUnit: user?.weightUnit,
        currency: user?.currency,
        firstname: user?.firstname,
        lastname: user?.lastname,
        language: user?.language,
      }}
      submitText={t("Save", "Save")}
      onSubmit={async (values) => {
        try {
          await updatePreferences(values);
          setLanguage(values.language);
          toast({
            title: t("UpdatePreferencesSuccess", "Preferences updated."),
            description: t(
              "UpdatePreferencesSuccessDetail",
              "Your new user preferences have been saved."
            ),
            status: "success",
          });
        } catch (error) {
          return {
            [FORM_ERROR]:
              "Sorry, there was an unexpected error. Please try again.",
          };
        }
      }}
      render={() => (
        <Fragment>
          <TextField
            name="firstname"
            label={t("Firstname", "Firstname")}
            placeholder={t("FirstnamePlaceholder", "Enter your firstname")}
            size="lg"
          />
          <TextField
            name="lastname"
            label={t("Lastname", "Lastname")}
            placeholder={t("LastnamePlaceholder", "Enter your lastname")}
            size="lg"
          />
          <SelectField name="language" label={t("Language", "Language")}>
            <option value={Language.US} hidden>
              🍔 Amercian English
            </option>
            <option value={Language.DE} hidden>
              🍺 Deutsch (German)
            </option>
            <option value={Language.EN}>☕ English</option>
            <option value={Language.ES} hidden>
              🥘 Español (Spanish)
            </option>
            <option value={Language.FR}>🧀 Français (French)</option>
            <option value={Language.IT} hidden>
              🍕 Italiano (Italian)
            </option>
          </SelectField>

          <SelectField
            name="weightUnit"
            label={t("WeightUnits", "Weight units")}
          >
            <option value={WeightUnit.METRIC}>
              {t("Metric", "Metric (g / kg)")}
            </option>
            <option value={WeightUnit.IMPERIAL}>
              {t("Imperial", "Imperial (oz / lb)")}
            </option>
          </SelectField>

          <SelectField name="currency" label={t("Currency", "Currency")}>
            <option value={Currency.USD}>{t("Dollars", "Dollars ($)")}</option>
            <option value={Currency.GBP}>{t("Pounds", "Pounds (£)")}</option>
            <option value={Currency.EUR}>{t("Euros", "Euros (€)")}</option>
          </SelectField>
        </Fragment>
      )}
    />
  );
};

export default UserPreferencesForm;
