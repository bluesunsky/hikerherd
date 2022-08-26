import type { FC } from "react";
import type { CategoryType, Gear } from "db";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useMutation, useQuery } from "blitz";

import { useTranslation } from "react-i18next";
import { Center, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { FORM_ERROR } from "final-form";

import SelectField from "app/components/forms/components/select-field";
import ModalForm from "app/components/forms/components/modal-form";
import categoriesQuery from "app/apps/categories/queries/categories-query";
import displayCategoryType from "app/apps/categories/helpers/display-category-type";

import addToInventoryMutation from "../mutations/add-to-inventory-mutation";
import addToInventorySchema from "../schemas/add-to-inventory-schema";

type AddToInventoryFormProps = {
  type?: CategoryType;
  gear?: Gear;
  onSuccess?: (
    result: PromiseReturnType<typeof addToInventoryMutation>
  ) => void;
  isOpen: boolean;
  onClose: () => void;
};

const AddToInventoryForm: FC<AddToInventoryFormProps> = ({
  gear,
  onSuccess,
  isOpen,
  type,
  onClose,
}) => {
  const [add] = useMutation(addToInventoryMutation);
  const { t } = useTranslation();
  const [categories, { isLoading }] = useQuery(
    categoriesQuery,
    { type },
    { suspense: false, enabled: !!type }
  );

  if (!gear || !type) return null;

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={t("AddGearTo", "Add {{gearname}} to your {{listname}}", {
        gearname: gear.name,
        listname: displayCategoryType(type),
      })}
      isDisabled={!categories?.length}
      schema={addToInventorySchema}
      submitText={t("Add", "Add")}
      initialValues={{
        gearId: gear?.id,
        categoryId: categories?.[0]?.id,
      }}
      onSubmit={async (values) => {
        try {
          const result = await add(values);

          onClose();

          if (onSuccess) {
            onSuccess(result);
          }
        } catch (error: unknown) {
          return {
            [FORM_ERROR]: t(
              "AddGearToError",
              "Sorry, there was an unexpected error. Please try again."
            ),
          };
        }
      }}
      render={() => (
        <Fragment>
          {isLoading ? (
            <Center p={3}>
              <Spinner />
            </Center>
          ) : (
            <Fragment>
              {!categories?.length && (
                <Text>
                  {t(
                    "NeedCategoryIn",
                    "Before you can start adding gear you need to create a category in your {{listname}}",
                    { listname: displayCategoryType(type) }
                  )}
                </Text>
              )}

              {!!categories?.length && (
                <SelectField name="categoryId" label="Choisir une catégorie">
                  {categories?.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </SelectField>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    />
  );
};

export default AddToInventoryForm;
