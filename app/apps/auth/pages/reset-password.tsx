import type { BlitzPage } from "blitz";

import { useRouter, Routes } from "blitz";

import { useToast } from "@chakra-ui/toast";

import BoxLayout from "app/layouts/box-layout";

import ResetPasswordForm from "../components/reset-password-form";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleSuccess = () => {
    router.push(Routes.StartPage());
    toast({
      title: "Mot de passe modifié",
      description: "Vous avez changé de mot de passe.",
      status: "success",
    });
  };

  return <ResetPasswordForm onSuccess={handleSuccess} />;
};

ResetPasswordPage.getLayout = (page) => (
  <BoxLayout
    title="Réinitialisez votre mot de passe"
    description="Quel serait votre nouveau mot de passe ?"
  >
    {page}
  </BoxLayout>
);

export default ResetPasswordPage;
