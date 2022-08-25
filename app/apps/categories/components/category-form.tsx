import type { FC } from "react";
import type { CategoryType } from "db";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useMutation, useQuery } from "blitz";

import { useTranslation } from "react-i18next";
import { Center } from "@chakra-ui/layout";
import { FORM_ERROR } from "final-form";
import { Spinner } from "@chakra-ui/spinner";

import TextField from "app/components/forms/components/text-field";
import ModalForm from "app/components/forms/components/modal-form";

import createCategoryMutation from "../mutations/create-category-mutation";
import createCategorySchema from "../schemas/create-category-schema";
import updateCategoryMutation from "../mutations/update-category-mutation";
import getCategoryQuery from "../queries/category-query";

type CategoryFormProps = {
  categoryId?: string | null;
  type: CategoryType;
  onSuccess?: (
    category: PromiseReturnType<
      typeof createCategoryMutation | typeof updateCategoryMutation
    >
  ) => void;
  isOpen: boolean;
  onClose: () => void;
};

const CategoryForm: FC<CategoryFormProps> = ({
  categoryId,
  onSuccess,
  isOpen,
  type,
  onClose,
}) => {
  const [createCategory] = useMutation(createCategoryMutation);
  const [updateCategory] = useMutation(updateCategoryMutation);
  const { t } = useTranslation();
  const [category, { isLoading }] = useQuery(
    getCategoryQuery,
    { id: categoryId },
    { suspense: false, enabled: !!categoryId }
  );

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={
        categoryId
          ? t("UpdateCategory", "Editing {{categoryname}}", {
              categoryname: category ? category.name : "",
            })
          : t("CreateCategory", "Create a new category")
      }
      schema={createCategorySchema}
      submitText={categoryId ? t("Update", "Update") : t("Create", "Create")}
      initialValues={{
        name: category ? category.name : "",
        type,
      }}
      onSubmit={async (values) => {
        try {
          let result;

          if (categoryId) {
            result = await updateCategory({ id: categoryId, ...values });
          } else {
            result = await createCategory(values);
          }

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
      render={() => (
        <Fragment>
          {isLoading ? (
            <Center p={3}>
              <Spinner />
            </Center>
          ) : (
            <TextField
              name="name"
              label={t("CategoryName", "Name")}
              placeholder={t(
                "CategoryNamePlaceholder",
                "The name of the category"
              )}
            />
          )}
        </Fragment>
      )}
    />
  );
};

export default CategoryForm;
