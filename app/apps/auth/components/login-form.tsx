import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { AuthenticationError, useMutation } from "blitz";

import { FORM_ERROR } from "final-form";
import { t } from "i18next";

import TextField from "app/components/forms/components/text-field";
import SimpleForm from "app/components/forms/components/simple-form";

import loginMutation from "../mutations/login-mutation";
import loginSchema from "../schemas/login-schema";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof loginMutation>) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [login] = useMutation(loginMutation);

  const handleError = (error: unknown) => {
    if (error instanceof AuthenticationError) {
      return {
        [FORM_ERROR]: t(
          "WrongLoginError",
          "Wrong email or password. Please try again."
        ),
      };
    } else {
      return {
        [FORM_ERROR]: t(
          "WrongLoginUnknownError",
          "Oops! Something went wrong logging you in. Please try again."
        ),
      };
    }
  };

  return (
    <SimpleForm
      schema={loginSchema}
      initialValues={{ email: "", password: "" }}
      submitText={t("Login", "Log in")}
      large
      onSubmit={async (values) => {
        try {
          const user = await login(values);
          if (onSuccess) onSuccess(user);
        } catch (error) {
          return handleError(error);
        }
      }}
      render={() => (
        <Fragment>
          <TextField
            name="email"
            label={t("EmailAddress", "Email address")}
            placeholder={t(
              "EmailAddressLoginPlaceholder",
              "Enter your email address"
            )}
            size="lg"
          />
          <TextField
            name="password"
            label={t("Password", "Password")}
            placeholder={t("PasswordPlaceholder", "Enter your password")}
            type="password"
            size="lg"
          />
        </Fragment>
      )}
    />
  );
};

export default LoginForm;
