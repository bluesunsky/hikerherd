import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment } from "react";
import { AuthenticationError, useMutation } from "blitz";

import { FORM_ERROR } from "final-form";

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
        [FORM_ERROR]: "Mail ou mot de passe incorrect. Merci de recommencer.",
      };
    } else {
      return {
        [FORM_ERROR]:
          "Quelque chose ne s'est pas bien passé. Merci de recommencer.",
      };
    }
  };

  return (
    <SimpleForm
      schema={loginSchema}
      initialValues={{ email: "", password: "" }}
      submitText="Connexion"
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
            label="Adresse mail"
            placeholder="Saisir votre adresse mail"
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

export default LoginForm;
