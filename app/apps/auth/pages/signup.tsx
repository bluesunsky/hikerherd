import type { BlitzPage } from "blitz";

import { Link, useRouter, Routes } from "blitz";

import { useTranslation } from "react-i18next";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";

import BoxLayout from "app/layouts/box-layout";
import TextDivider from "app/components/text-divider";

import SignupForm from "../components/signup-form";

const SignupPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  return (
    <BoxLayout
      title={t("Signup", "Sign up")}
      description={t(
        "SignupDescription",
        "You are at the trailhead, time to take your first step."
      )}
    >
      <Stack spacing={8}>
        <SignupForm
          onSuccess={(user) => {
            router.push(Routes.StartPage());
            toast({
              title: t("WelcomeTo", "Welcome to {{appliname}}", {
                appliname: t("AppliName"),
              }),
              description: t("HiUser", "Hi {{username}}", {
                username: user.username,
              }),
              status: "success",
            });
          }}
        />

        <TextDivider>{t("Or", "Or")}</TextDivider>
        <Link href={Routes.LoginPage()} passHref>
          <Button size="lg" as="a">
            {t("Login", "Log in")}
          </Button>
        </Link>
      </Stack>
    </BoxLayout>
  );
};

SignupPage.redirectAuthenticatedTo = Routes.StartPage();

export default SignupPage;
