import type { FC } from "react";

import { useMutation } from "blitz";

import { FORM_ERROR } from "final-form";
import { z } from "zod";
import { Stack, Text, Link, HStack } from "@chakra-ui/layout";
import { FaList } from "react-icons/fa";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";

import ModalForm from "app/components/forms/components/modal-form";
import FileField from "app/components/forms/components/file-field";
import CsvImportError from "app/apps/inventory/errors/csv-import-error";
import CheckboxField from "app/components/forms/components/checkbox-field";
import readFile from "app/helpers/read-file";
import PrismaError from "app/errors/prisma-error";

import packImportCsvMutation from "../mutations/pack-import-csv-mutation";
import packImportCsvSchema from "../schemas/pack-import-csv-schema";

type ImportPackCsvFormProps = {
  packId: string;
  onSuccess?: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const ImportPackCsvForm: FC<ImportPackCsvFormProps> = ({
  packId,
  onSuccess,
  isOpen,
  onClose,
}) => {
  const [importCsv] = useMutation(packImportCsvMutation);

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title="Importer depuis un CSV"
      schema={packImportCsvSchema.extend({ file: z.any() })}
      submitText="Importer"
      initialValues={{ id: packId, addToInventory: false }}
      onSubmit={async ({ file, addToInventory }) => {
        if (!file) {
          return {
            [FORM_ERROR]: "Un fichier est nécessaire.",
          };
        }

        try {
          const target = await readFile(file);
          await importCsv({ file: target.result, id: packId, addToInventory });
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
          <HStack>
            <Tag colorScheme="blue" flexShrink={0}>
              <TagLeftIcon as={FaList} />
              <TagLabel>Importer aussi l&lsquo;inventaire ?</TagLabel>
            </Tag>
            <CheckboxField name="addToInventory" />
          </HStack>
        </Stack>
      )}
    />
  );
};

export default ImportPackCsvForm;
