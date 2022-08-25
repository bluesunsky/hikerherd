import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useQuery, useMutation } from "blitz";

import { useTranslation } from "react-i18next";
import { Center, HStack } from "@chakra-ui/layout";
import { FORM_ERROR } from "final-form";
import { Spinner } from "@chakra-ui/spinner";
import { FaLock } from "react-icons/fa";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";

import TextField from "app/components/forms/components/text-field";
import EditorField from "app/components/editor/components/editor-field";
import ModalForm from "app/components/forms/components/modal-form";
import CheckboxField from "app/components/forms/components/checkbox-field";

import createPackMutation from "../mutations/create-pack-mutation";
import createPackSchema from "../schemas/create-pack-schema";
import updatePackMutation from "../mutations/update-pack-mutation";
import packQuery from "../queries/pack-query";

type PackFormProps = {
  packId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (
    pack: PromiseReturnType<
      typeof createPackMutation | typeof updatePackMutation
    >
  ) => void;
};

const PackForm: FC<PackFormProps> = ({
  packId,
  onSuccess,
  isOpen,
  onClose,
}) => {
  const [createPack] = useMutation(createPackMutation);
  const [updatePack] = useMutation(updatePackMutation);
  const { t } = useTranslation();
  const [pack, { isLoading }] = useQuery(
    packQuery,
    { id: packId },
    { suspense: false, enabled: !!packId }
  );

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={createPackSchema}
      title={
        packId
          ? t("UpdatePack", "Update pack")
          : t("CreatePack", "Create a new pack")
      }
      submitText={packId ? t("Update", "Update") : t("Create", "Create")}
      initialValues={{
        name: pack ? pack.name : "",
        notes: pack?.notes ? JSON.parse(pack.notes) : null,
        private: !!pack?.private,
      }}
      onSubmit={async (values) => {
        try {
          let result;

          if (pack) {
            result = await updatePack({ id: pack.id, ...values });
          } else {
            result = await createPack(values);
          }

          if (onSuccess) onSuccess(result);
        } catch (error: unknown) {
          return {
            [FORM_ERROR]: t(
              "UpdatePackError",
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
              <TextField
                name="name"
                label={t("PackName", "Name")}
                placeholder={t("PackNamePlaceholder", "Name your pack")}
              />
              <EditorField
                name="notes"
                fontSize="md"
                label={t("Notes", "Notes")}
                features={{
                  image: true,
                  blockquote: true,
                  heading: true,
                  horizontalRule: true,
                }}
                barMenu
                bubbleMenu
                floatingMenu
              />
              <HStack>
                <Tag colorScheme="orange" flexShrink={0}>
                  <TagLeftIcon as={FaLock} />
                  <TagLabel>{t("Private?", "Private?")}</TagLabel>
                </Tag>
                <CheckboxField name="private" />
              </HStack>
            </Fragment>
          )}
        </Fragment>
      )}
    />
  );
};

export default PackForm;
