import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { useMutation } from "blitz";

import { FORM_ERROR } from "final-form";
import { useTranslation } from "react-i18next";

import TextField from "app/components/forms/components/text-field";
import SimpleForm from "app/components/forms/components/simple-form";

import forgotPasswordSchema from "../schemas/forgot-password-schema";
import forgotPasswordMutation from "../mutations/forgot-password-mutation";

type ForgotPasswordFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof forgotPasswordMutation>) => void;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onSuccess }) => {
  const [forgotPassword] = useMutation(forgotPasswordMutation);
  const { t } = useTranslation();
  return (
    <SimpleForm
      schema={forgotPasswordSchema}
      initialValues={{ email: "" }}
      submitText={t("SendResetEmail", "Send reset email")}
      large
      onSubmit={async (values) => {
        try {
          const result = await forgotPassword(values);
          if (onSuccess) onSuccess(result);
        } catch (error) {
          return {
            [FORM_ERROR]: t(
              "SendResetEmailError",
              "Oops! Something went wrong sending your password reset email. Please try again."
            ),
          };
        }
      }}
      render={() => (
        <TextField
          name="email"
          label={t("EmailAddress", "Email address")}
          placeholder={t(
            "EmailAddressForgetPasswordPlaceholder",
            "Enter the email address you signed up with"
          )}
          size="lg"
        />
      )}
    />
  );
};

export default ForgotPasswordForm;
