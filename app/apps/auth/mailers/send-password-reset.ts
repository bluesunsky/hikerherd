import type { User } from "db";

import { t } from "i18next";

import postmark from "integrations/postmark";
const APP_ORIGIN = process.env.BLITZ_PUBLIC_APP_ORIGIN;

type SendPasswordResetOptions = {
  token: string;
};

const sendPasswordReset = (user: User, { token }: SendPasswordResetOptions) => {
  const resetUrl = `${APP_ORIGIN}/reset-password?token=${token}`;

  return postmark.sendEmailWithTemplate({
    From: t("AppliMail"),
    To: user.email,
    TemplateAlias: "password-reset",
    TemplateModel: {
      product_url: APP_ORIGIN,
      product_name: t("AppliName"),
      name: user.username,
      action_url: resetUrl,
      company_name: t("AppliName"),
      company_address: t("AppliUrl"),
    },
  });
};

export default sendPasswordReset;
