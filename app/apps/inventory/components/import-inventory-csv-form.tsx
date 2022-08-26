import type { FC } from "react";
import type { CategoryType } from "db";

import { useMutation } from "blitz";

import { useTranslation } from "react-i18next";
import { FORM_ERROR } from "final-form";
import { z } from "zod";
import { Stack, Text, Link } from "@chakra-ui/layout";

import ModalForm from "app/components/forms/components/modal-form";
import FileField from "app/components/forms/components/file-field";
import readFile from "app/helpers/read-file";
import PrismaError from "app/errors/prisma-error";

import inventoryImportCsvMutation from "../mutations/inventory-import-csv-mutation";
import CsvImportError from "../errors/csv-import-error";

type ImportInventoryCsvFormProps = {
  type: CategoryType;
  onSuccess?: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const ImportInventoryCsvForm: FC<ImportInventoryCsvFormProps> = ({
  type,
  onSuccess,
  isOpen,
  onClose,
}) => {
  const [importCsv] = useMutation(inventoryImportCsvMutation);
  const { t } = useTranslation();
  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={t("ImportCSV", "Import CSV")}
      schema={z.object({ file: z.any() })}
      submitText={t("Import", "Import")}
      initialValues={{}}
      onSubmit={async ({ file }) => {
        if (!file) {
          return {
            [FORM_ERROR]: t("ImportNoFileError", "A file is required."),
          };
        }

        try {
          const target = await readFile(file);
          await importCsv({ file: target.result, type });
          onClose();

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          if (error instanceof CsvImportError) {
            return { [FORM_ERROR]: error.errors };
          } else if (error instanceof PrismaError) {
            return { [FORM_ERROR]: error.message };
          } else {
            return {
              [FORM_ERROR]: t(
                "ImportError",
                "Sorry, there was an unexpected error. Please try again."
              ),
            };
          }
        }
      }}
      render={() => (
        <Stack spacing={6}>
          <Text>
            {t(
              "ImportInformation1",
              "When you import gear it will be appended to what you already have. Nothing will be deleted or modified."
            )}
          </Text>
          <Text>
            <strong>
              {t(
                "ImportInformation2",
                "Your CSV file must be in the correct format."
              )}
            </strong>{" "}
            <br />
            <Link
              href="https://blog.hikerherd.com/the-csv-import-guide/"
              isExternal
              textDecoration="underline"
            >
              {t("ImportInformation3", "Read the importing guide")}
            </Link>{" "}
            {t("ImportInformation4", "for more details.")}
          </Text>
          <FileField
            name="file"
            label={t("CsvFile", "CSV file")}
            accept="text/csv"
          />
        </Stack>
      )}
    />
  );
};

export default ImportInventoryCsvForm;
