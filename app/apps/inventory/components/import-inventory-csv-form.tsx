import type { FC } from "react";
import type { CategoryType } from "db";

import { useMutation } from "blitz";

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

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title="Importer depuis un CSV"
      schema={z.object({ file: z.any() })}
      submitText="Importer"
      initialValues={{}}
      onSubmit={async ({ file }) => {
        if (!file) {
          return {
            [FORM_ERROR]: "Un fichier est nécessaire.",
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
              [FORM_ERROR]:
                "Sorry, there was an unexpected error. Please try again.",
            };
          }
        }
      }}
      render={() => (
        <Stack spacing={6}>
          <Text>
            Lorsque vous importez de l&lsquo;équipement, il sera ajouté à ce que
            vous avez déjà. Rien ne sera supprimé ou modifié.
          </Text>
          <Text>
            <strong>Votre fichier CSV doit être dans le bon format.</strong>{" "}
            <Link
              href="https://blog.hikerherd.com/the-csv-import-guide/"
              isExternal
              textDecoration="underline"
            >
              Lire le guide d&lsquo;importation
            </Link>{" "}
            pour plus de détail.
          </Text>
          <FileField name="file" label="Fichier CSV" accept="text/csv" />
        </Stack>
      )}
    />
  );
};

export default ImportInventoryCsvForm;
