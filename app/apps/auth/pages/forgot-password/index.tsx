import type { BlitzPage } from "blitz";

import { useRouter, Link, Routes } from "blitz";

import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import BoxLayout from "app/layouts/box-layout";
import TextDivider from "app/components/text-divider";

import ForgotPasswordForm from "../../components/forgot-password-form";

const ForgotPasswordPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Stack spacing={8}>
      <ForgotPasswordForm
        onSuccess={() => router.push(Routes.ForgotPasswordConfirmPage())}
      />

      <TextDivider>Ou</TextDivider>

      <Stack spacing={4}>
        <Link href={Routes.LoginPage()} passHref>
          <Button as="a" isFullWidth size="lg">
            Connexion
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = Routes.StartPage();
ForgotPasswordPage.getLayout = (page) => (
  <BoxLayout
    title="Mot de passé égaré ?"
    description="Pas de soucis. Indiquez-nous votre mail et vous recevrez des instructions pour réinitialiser votre mot de passe."
  >
    {page}
  </BoxLayout>
);

export default ForgotPasswordPage;
