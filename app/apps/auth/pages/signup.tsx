import type { BlitzPage } from "blitz";

import { Link, useRouter, Routes } from "blitz";

import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";

import BoxLayout from "app/layouts/box-layout";
import TextDivider from "app/components/text-divider";

import SignupForm from "../components/signup-form";

const SignupPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Stack spacing={8}>
      <SignupForm
        onSuccess={(user) => {
          router.push(Routes.StartPage());
          toast({
            title: "Bienvenue dans Pack your pack",
            description: `Bonjour ${user.username}.`,
            status: "success",
          });
        }}
      />

      <TextDivider>Or</TextDivider>
      <Link href={Routes.LoginPage()} passHref>
        <Button size="lg" as="a">
          Connexion
        </Button>
      </Link>
    </Stack>
  );
};

SignupPage.redirectAuthenticatedTo = Routes.StartPage();
SignupPage.getLayout = (page) => (
  <BoxLayout
    title="Enregistrement"
    description="Il est temps de faire vos premiers pas."
  >
    {page}
  </BoxLayout>
);

export default SignupPage;
