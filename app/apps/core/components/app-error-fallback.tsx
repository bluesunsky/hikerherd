import type { FC } from "react";
import type { ErrorFallbackProps } from "blitz";

import { AuthenticationError, AuthorizationError, NotFoundError } from "blitz";

import { useTranslation } from "react-i18next";

import LoginForm from "app/apps/auth/components/login-form";
import BoxLayout from "app/layouts/box-layout";

const AppErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { t } = useTranslation();
  if (error instanceof AuthenticationError) {
    return (
      <BoxLayout
        title={t("LoginRequired", "Log in")}
        description={t(
          "LoginRequiredDetail",
          "You aren't logged in! You need to log in to continue."
        )}
      >
        <LoginForm onSuccess={resetErrorBoundary} />
      </BoxLayout>
    );
  }

  if (error instanceof AuthorizationError) {
    return (
      <BoxLayout
        title={t("Unauthorized", "Unauthorized")}
        description={t(
          "UnauthorizedDetail",
          "Sorry, you are not allowed to do that."
        )}
      />
    );
  }

  if (error instanceof NotFoundError) {
    return (
      <BoxLayout
        title={t("NotFound", "Not found")}
        description={t("NotFoundDetail", "Are you lost?")}
      />
    );
  }

  return (
    <BoxLayout
      title={t("ThereWasAnError", "There was an error")}
      description={error.message || error.name}
    />
  );
};

export default AppErrorFallback;
