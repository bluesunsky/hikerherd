import type { FC } from "react";
import type { ErrorFallbackProps } from "blitz";

import { AuthenticationError, AuthorizationError, NotFoundError } from "blitz";

import LoginForm from "app/apps/auth/components/login-form";
import BoxLayout from "app/layouts/box-layout";

const AppErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  if (error instanceof AuthenticationError) {
    return (
      <BoxLayout
        title="Connexion"
        description="Vous devenez vous connecter pour continuer."
      >
        <LoginForm onSuccess={resetErrorBoundary} />
      </BoxLayout>
    );
  }

  if (error instanceof AuthorizationError) {
    return (
      <BoxLayout
        title="Interdiction"
        description="Vous n'êtes pas autorisé à faire cela."
      />
    );
  }

  if (error instanceof NotFoundError) {
    return <BoxLayout title="Introuvable" description="Êtes vous perdu ?" />;
  }

  return (
    <BoxLayout
      title="Il y a une erreur"
      description={error.message || error.name}
    />
  );
};

export default AppErrorFallback;
