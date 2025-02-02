import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useMutation } from "blitz";

import { FORM_ERROR } from "final-form";
import { useTranslation } from "react-i18next";

import TextField from "app/components/forms/components/text-field";
import SimpleForm from "app/components/forms/components/simple-form";

import signupMutation from "../mutations/signup-mutation";
import signupSchema from "../schemas/signup-schema";
import UserCreateError from "../errors/user-create-error";

type SignupFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof signupMutation>) => void;
};

const SignupForm: FC<SignupFormProps> = ({ onSuccess }) => {
  const [signup] = useMutation(signupMutation);
  const { t } = useTranslation();
  const handleError = (error: unknown) => {
    if (error instanceof UserCreateError && error.emailTaken) {
      return {
        email: t(
          "EmailAddressAlreadyUsedError",
          "This email address is already in use. Try logging in instead."
        ),
      };
    }

    if (error instanceof UserCreateError && error.usernameTaken) {
      return {
        username: t(
          "UsernameAlreadyUsedError",
          "This username is already being used. Please pick a new one."
        ),
      };
    }

    if (error instanceof Error) {
      return { [FORM_ERROR]: error.message };
    }

    return {
      [FORM_ERROR]: t(
        "SignupError",
        "Oops! Something went wrong while your account was being created. Please try again."
      ),
    };
  };

  return (
    <SimpleForm
      schema={signupSchema}
      initialValues={{ email: "", username: "", password: "" }}
      submitText={t("Join", "Join")}
      large
      onSubmit={async (values) => {
        try {
          const result = await signup(values);
          if (onSuccess) onSuccess(result);
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
              "EmailAddressPlaceholder",
              "Enter your email address"
            )}
            size="lg"
          />
          <TextField
            name="username"
            label={t("Username", "Username")}
            placeholder={t("UsernamePlaceholder", "Pick an online trail-name")}
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

export default SignupForm;
