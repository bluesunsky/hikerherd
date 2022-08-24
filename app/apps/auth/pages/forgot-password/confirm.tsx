import type { BlitzPage } from "blitz";

import { Link, Routes } from "blitz";

import { Button } from "@chakra-ui/button";
import { t } from "i18next";

import BoxLayout from "app/layouts/box-layout";
const ForgotPasswordConfirmPage: BlitzPage = () => {
  return (
    <Link href={Routes.LoginPage()} passHref>
      <Button as="a" isFullWidth size="lg">
        {t("BackToLogin", "Back to login")}
      </Button>
    </Link>
  );
};

ForgotPasswordConfirmPage.redirectAuthenticatedTo = Routes.StartPage();
ForgotPasswordConfirmPage.getLayout = (page) => (
  <BoxLayout
    title={t("ForgotPasswordConfirm", "Your email is on the way")}
    description={t(
      "ForgotPasswordConfirmDescription",
      "If your email address has a hikerherd account then you have been sent a password reset link."
    )}
  >
    {page}
  </BoxLayout>
);

export default ForgotPasswordConfirmPage;
