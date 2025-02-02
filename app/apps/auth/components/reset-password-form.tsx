import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useRouterQuery, useMutation } from "blitz";

import { FORM_ERROR } from "final-form";
import { useTranslation } from "react-i18next";

import TextField from "app/components/forms/components/text-field";
import SimpleForm from "app/components/forms/components/simple-form";

import resetPasswordSchema from "../schemas/reset-password-schema";
import resetPasswordMutation from "../mutations/reset-password-mutation";
import ResetPasswordError from "../errors/reset-password-error";

type ResetPasswordFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof resetPasswordMutation>) => void;
};

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const query = useRouterQuery();
  const [resetPassword] = useMutation(resetPasswordMutation);
  const { t } = useTranslation();
  const initialValues = {
    password: "",
    passwordConfirmation: "",
    token: query.token as string,
  };

  const handleError = (error: unknown) => {
    if (error instanceof ResetPasswordError) {
      return { [FORM_ERROR]: error.message };
    } else {
      return {
        [FORM_ERROR]: t(
          "SendResetEmailError",
          "Oops! Something went wrong sending your password reset email. Please try again."
        ),
      };
    }
  };

  return (
    <SimpleForm
      schema={resetPasswordSchema}
      initialValues={initialValues}
      submitText={t("ResetPassword", "Reset password")}
      large
      onSubmit={async (values) => {
        try {
          const result = await resetPassword(values);
          if (onSuccess) onSuccess(result);
        } catch (error) {
          return handleError(error);
        }
      }}
      render={() => (
        <Fragment>
          <TextField
            name="password"
            label={t("NewPassword", "New Password")}
            type="password"
          />
          <TextField
            name="passwordConfirmation"
            label={t("ConfirmNewPassword", "Confirm New Password")}
            type="password"
          />
        </Fragment>
      )}
    ></SimpleForm>
  );
};

export default ResetPasswordForm;
