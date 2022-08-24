import type { BlitzPage } from "blitz";

import { useRouter, Routes } from "blitz";

import { useToast } from "@chakra-ui/toast";
import { t } from "i18next";

import BoxLayout from "app/layouts/box-layout";

import ResetPasswordForm from "../components/reset-password-form";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleSuccess = () => {
    router.push(Routes.StartPage());
    toast({
      title: t("ResetPasswordSuccess", "Password changed"),
      description: t(
        "ResetPasswordSuccessDescription",
        "You have successfully changed your password."
      ),
      status: "success",
    });
  };

  return <ResetPasswordForm onSuccess={handleSuccess} />;
};

ResetPasswordPage.getLayout = (page) => (
  <BoxLayout
    title={t("ResetPassword", "Reset Your Password")}
    description={t(
      "ResetPasswordDescription",
      "What would you like your new password to be?"
    )}
  >
    {page}
  </BoxLayout>
);

export default ResetPasswordPage;
