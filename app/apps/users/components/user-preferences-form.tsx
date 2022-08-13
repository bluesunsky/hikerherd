import type { BlitzPage } from "blitz";

import { useMutation } from "blitz";
import { Fragment } from "react";

import { useToast } from "@chakra-ui/toast";
import { FORM_ERROR } from "final-form";

import SimpleForm from "app/components/forms/components/simple-form";
import SelectField from "app/components/forms/components/select-field";

import { Currency, WeightUnit } from "db";

import useCurrentUser from "../hooks/use-current-user";
import updatePreferencesSchema from "../schemas/update-preferences-schema";
import updatePreferencesMutation from "../mutations/update-preferences-mutation";

const UserPreferencesForm: BlitzPage = () => {
  const user = useCurrentUser();
  const toast = useToast();
  const [updatePreferences] = useMutation(updatePreferencesMutation);

  return (
    <SimpleForm
      schema={updatePreferencesSchema}
      initialValues={{ weightUnit: user?.weightUnit, currency: user?.currency }}
      submitText="Modifier"
      onSubmit={async (values) => {
        try {
          await updatePreferences(values);
          toast({
            title: "Préférences modifiées.",
            description: "Vos préférences d'utilisateur ont été enregistrées.",
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
          <SelectField name="weightUnit" label="Unité de poids">
            <option value={WeightUnit.METRIC}>Métrique (g / kg)</option>
            <option value={WeightUnit.IMPERIAL}>Impériale (oz / lb)</option>
          </SelectField>

          <SelectField name="currency" label="Monnaie">
            <option value={Currency.USD}>Dollars ($)</option>
            <option value={Currency.GBP}>Livres Sterling (£)</option>
            <option value={Currency.EUR}>Euros (€)</option>
          </SelectField>
        </Fragment>
      )}
    />
  );
};

export default UserPreferencesForm;
