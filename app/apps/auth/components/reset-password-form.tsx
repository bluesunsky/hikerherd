import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useRouterQuery, useMutation } from "blitz";

import { FORM_ERROR } from "final-form";

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
        [FORM_ERROR]: "Sorry, there was an unexpected error. Please try again.",
      };
    }
  };

  return (
    <SimpleForm
      schema={resetPasswordSchema}
      initialValues={initialValues}
      submitText="Réinitialiser le mot de passe"
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
            label="Nouveau mot de passe"
            type="password"
          />
          <TextField
            name="passwordConfirmation"
            label="Confirmer votre mot de passe"
            type="password"
          />
        </Fragment>
      )}
    ></SimpleForm>
  );
};

export default ResetPasswordForm;
