import type { BlitzPage } from "blitz";

import { useRouter, Routes } from "blitz";

import { useToast } from "@chakra-ui/toast";
import { useTranslation } from "react-i18next";

import BoxLayout from "app/layouts/box-layout";

import ResetPasswordForm from "../components/reset-password-form";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const handleSuccess = () => {
    router.push(Routes.StartPage());
    toast({
      title: t("ResetPasswordSuccess", "Password changed"),
      description: t(
        "ResetPasswordSuccessDetail",
        "You have successfully changed your password."
      ),
      status: "success",
    });
  };

  return (
    <BoxLayout
      title={t("ResetPassword", "Reset Your Password")}
      description={t(
        "ResetPasswordDetail",
        "What would you like your new password to be?"
      )}
    >
      <ResetPasswordForm onSuccess={handleSuccess} />
    </BoxLayout>
  );
};

export default ResetPasswordPage;
