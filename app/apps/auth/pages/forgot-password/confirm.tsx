import type { BlitzPage } from "blitz";

import { Link, Routes } from "blitz";

import { Button } from "@chakra-ui/button";

import BoxLayout from "app/layouts/box-layout";

const ForgotPasswordConfirmPage: BlitzPage = () => {
  return (
    <Link href={Routes.LoginPage()} passHref>
      <Button as="a" isFullWidth size="lg">
        Revenir à la connexion
      </Button>
    </Link>
  );
};

ForgotPasswordConfirmPage.redirectAuthenticatedTo = Routes.StartPage();
ForgotPasswordConfirmPage.getLayout = (page) => (
  <BoxLayout
    title="Le mail est en route"
    description="Si votre adresse mail est bien celle de votre compte, vous allez recevoir un lien de réinitialisation de mot de passe.."
  >
    {page}
  </BoxLayout>
);

export default ForgotPasswordConfirmPage;
