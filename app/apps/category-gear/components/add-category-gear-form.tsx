import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { useContext } from "react";
import { useMutation } from "blitz";

import { FORM_ERROR } from "final-form";
import { useTranslation } from "react-i18next";

import { ozTog } from "app/helpers/display-weight";
import GearFormFields from "app/apps/gear/components/gear-form-fields";
import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import ModalTabForm from "app/components/forms/components/modal-tab-form";

import createCategoryGearMutation from "../mutations/create-category-gear-mutation";
import createCategoryGearSchema from "../schemas/create-category-gear-schema";

type AddCategoryGearFormProps = {
  categoryId?: string | null;
  onSuccess?: (
    gear: PromiseReturnType<typeof createCategoryGearMutation>
  ) => void;
  onClose: () => void;
};

const AddCategoryGearForm: FC<AddCategoryGearFormProps> = ({
  categoryId,
  onSuccess,
  onClose,
}) => {
  const [createGear] = useMutation(createCategoryGearMutation);
  const { t } = useTranslation();
  const { weightUnit, currency } = useContext(userPreferencesContext);

  if (!categoryId) return null;

  const initialValues = {
    categoryId,
    name: "",
    manufacturer: "",
    kind: "",
    weight: 0,
    price: null,
    currency: currency,
    location: null,
    link: null,
    imageUrl: null,
    notes: null,
    consumable: false,
    replaceable: false,
    private: false,
    purchaseDate: null,
  };

  return (
    <ModalTabForm
      schema={createCategoryGearSchema}
      initialValues={initialValues}
      onClose={onClose}
      submitText={t("Add", "Add")}
      onSubmit={async (values) => {
        try {
          const vals = { ...values };

          if (weightUnit === "IMPERIAL") {
            vals.weight = ozTog(values.weight);
          }

          if (values.price) {
            vals.price = Math.floor(values.price * 100);
          }

          if (!categoryId)
            throw new Error(t("CategoryRequired", "Category required"));
          const result = await createGear(vals);

          onClose();
          if (onSuccess) {
            onSuccess(result);
          }
        } catch (error: unknown) {
          return {
            [FORM_ERROR]: t(
              "SaveCategoryError",
              "Sorry, there was an unexpected error. Please try again."
            ),
          };
        }
      }}
      render={() => <GearFormFields />}
    />
  );
};

export default AddCategoryGearForm;
