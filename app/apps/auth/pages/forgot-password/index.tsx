import type { BlitzPage } from "blitz";

import { useRouter, Link, Routes } from "blitz";

import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useTranslation } from "react-i18next";

import BoxLayout from "app/layouts/box-layout";
import TextDivider from "app/components/text-divider";

import ForgotPasswordForm from "../../components/forgot-password-form";

const ForgotPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <BoxLayout
      title={t("ForgotYourPassword", "Forgot Your Password?")}
      description={t(
        "ForgotYourPasswordDetail",
        "No worries. Tell us your email and you will be sent instructions for resetting your password."
      )}
    >
      <Stack spacing={8}>
        <ForgotPasswordForm
          onSuccess={() => router.push(Routes.ForgotPasswordConfirmPage())}
        />

        <TextDivider>{t("Or", "Or")}</TextDivider>

        <Stack spacing={4}>
          <Link href={Routes.LoginPage()} passHref>
            <Button as="a" isFullWidth size="lg">
              {t("Login", "Log in")}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </BoxLayout>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = Routes.StartPage();

export default ForgotPasswordPage;
