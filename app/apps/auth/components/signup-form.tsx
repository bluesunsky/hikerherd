import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { useMutation } from "blitz";

import { FORM_ERROR } from "final-form";

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

  const handleError = (error: unknown) => {
    if (error instanceof UserCreateError && error.emailTaken) {
      return {
        email: "Ce mail est déjà utilisé. Essayer de vous connecter avec.",
      };
    }

    if (error instanceof UserCreateError && error.usernameTaken) {
      return {
        username:
          "Ce pseudonyme est déjà utilisé. Merci d'en choisir un autre.",
      };
    }

    if (error instanceof Error) {
      return { [FORM_ERROR]: error.message };
    }

    return {
      [FORM_ERROR]:
        "Oops! Something went wrong while your account was being created. Please try again.",
    };
  };

  return (
    <SimpleForm
      schema={signupSchema}
      initialValues={{ email: "", username: "", password: "" }}
      submitText="Rejoindre Pack your pack"
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
            label="Adresse mail"
            placeholder="Saisir votre adresse mail"
            size="lg"
          />
          <TextField
            name="username"
            label="Pseudonyme"
            placeholder="Saisir votre pseudonyme"
            size="lg"
          />
          <TextField
            name="password"
            label="Mot de passe"
            placeholder="Saisir votre mot de passe"
            type="password"
            size="lg"
          />
        </Fragment>
      )}
    />
  );
};

export default SignupForm;
