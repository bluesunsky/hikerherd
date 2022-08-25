import type { BlitzPage } from "blitz";

import { useRouter, Link, Routes } from "blitz";

import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { useTranslation } from "react-i18next";

import BoxLayout from "app/layouts/box-layout";
import TextDivider from "app/components/text-divider";

import LoginForm from "../components/login-form";

const LoginPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const next = router.query.next as string | undefined;
  const redirectTo = decodeURIComponent(next || "/");

  return (
    <BoxLayout
      title={t("Login", "Log in")}
      description={t("LoginDescription", "Sign the trail register.")}
    >
      <Stack spacing={8}>
        <LoginForm
          onSuccess={(user) => {
            router.push(redirectTo);
            toast({
              title: t("WelcomeUser", "Welcome {{username}}", {
                username: user
                  ? user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)
                  : "",
              }),
              description: t(
                "LoginSuccessDescription",
                "You have logged in successfully."
              ),
              status: "success",
            });
          }}
        />

        <TextDivider>{t("Or", "Or")}</TextDivider>

        <Stack spacing={4}>
          <Link href={Routes.SignupPage()} passHref>
            <Button as="a" isFullWidth size="lg">
              {t("Signup", "Sign up")}
            </Button>
          </Link>
          <Link href={Routes.ForgotPasswordPage()} passHref>
            <Button as="a" isFullWidth size="lg">
              {t("ResetPassword", "Reset password")}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </BoxLayout>
  );
};

LoginPage.redirectAuthenticatedTo = Routes.StartPage();

export default LoginPage;
