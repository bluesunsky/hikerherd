import type { FC } from "react";
import type { CategoryType } from "db";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useMutation, useQuery } from "blitz";

import { useTranslation } from "react-i18next";
import { Center, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import { FORM_ERROR } from "final-form";

import SelectField from "app/components/forms/components/select-field";
import ModalForm from "app/components/forms/components/modal-form";
import categoriesQuery from "app/apps/categories/queries/categories-query";
import displayCategoryType from "app/apps/categories/helpers/display-category-type";
import moveCategoryGearMutation from "app/apps/category-gear/mutations/move-category-gear-mutation";
import moveCategoryGearSchema from "app/apps/category-gear/schemas/move-category-gear-schema";

type ToggleItemTypeFormProps = {
  type: CategoryType;
  itemId?: string | null;
  onSuccess?: (
    result: PromiseReturnType<typeof moveCategoryGearMutation>
  ) => void;
  isOpen: boolean;
  onClose: () => void;
};

const ToggleItemTypeForm: FC<ToggleItemTypeFormProps> = ({
  itemId,
  onSuccess,
  isOpen,
  type,
  onClose,
}) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [moveGear] = useMutation(moveCategoryGearMutation);

  const [categories, { isLoading }] = useQuery(
    categoriesQuery,
    { type },
    { suspense: false, enabled: !!type }
  );

  const typeName = displayCategoryType(type);

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={t("MoveGearTo", "Move this gear to your {{typename}}", {
        typename: typeName,
      })}
      schema={moveCategoryGearSchema}
      initialValues={{
        index: 0,
        id: itemId || "",
        categoryId: categories?.[0]?.id,
      }}
      submitText={t("Move", "Move")}
      onSubmit={async (values) => {
        try {
          const result = await moveGear(values);

          onClose();

          toast({
            title: t("MoveGearSuccess", "Your gear was moved"),
            description: t(
              "MoveGearSuccesDetail",
              "This was moved into your {{typename}} successfully",
              { typename: typeName }
            ),
            status: "success",
          });

          if (onSuccess) {
            onSuccess(result);
          }
        } catch (error: unknown) {
          return {
            [FORM_ERROR]: t(
              "MoveGearError",
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
            <Stack spacing={3}>
              {!categories?.length && (
                <Text>
                  {t(
                    "NeedCategoryCreationError",
                    "Before you can start adding gear you need to create a category in your {{typename}}",
                    { typename: typeName }
                  )}
                </Text>
              )}

              {categories?.length && (
                <SelectField
                  name="categoryId"
                  label={t("ChooseCategory", "Choose a category")}
                >
                  {categories?.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </SelectField>
              )}
            </Stack>
          )}
        </Fragment>
      )}
    />
  );
};

export default ToggleItemTypeForm;
