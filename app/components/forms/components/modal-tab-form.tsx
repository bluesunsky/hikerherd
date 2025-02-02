import type { FormComponent } from "../types/form-component";

import { validateZodSchema } from "blitz";

import { useTranslation } from "react-i18next";
import { Form as FinalForm } from "react-final-form";
import { Stack, HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useColorModeValue } from "@chakra-ui/react";

type ModalTabFormProps = {
  submitText: string;
  onClose: () => void;
};

const ModalTabForm: FormComponent<ModalTabFormProps> = ({
  schema,
  initialValues,
  onSubmit,
  render,
  submitText,
  onClose,
  ...props
}) => {
  const stickyBg = useColorModeValue("white", "gray.700");
  const { t } = useTranslation();
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={(form) => (
        <form onSubmit={form.handleSubmit} {...props}>
          <Stack spacing={6}>
            {form.submitError && (
              <Alert status="error">
                <AlertIcon />
                {form.submitError}
              </Alert>
            )}

            <Stack spacing={4}>{render(form)}</Stack>
          </Stack>

          <HStack
            spacing={3}
            justifyContent="flex-end"
            position="sticky"
            bottom="0"
            bg={stickyBg}
            py={3}
            mb={-4}
          >
            <Button
              colorScheme="green"
              type="submit"
              isLoading={form.submitting}
            >
              {submitText}
            </Button>
            <Button onClick={onClose}>{t("Cancel", "Cancel")}</Button>
          </HStack>
        </form>
      )}
    />
  );
};

export default ModalTabForm;
