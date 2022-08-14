import type { User } from "db";

import postmark from "integrations/postmark";

const APP_ORIGIN = process.env.BLITZ_PUBLIC_APP_ORIGIN;

type SendPasswordResetOptions = {
  token: string;
};

const sendPasswordReset = (user: User, { token }: SendPasswordResetOptions) => {
  const resetUrl = `${APP_ORIGIN}/reset-password?token=${token}`;

  return postmark.sendEmailWithTemplate({
    From: "packyourpack@serant.fr",
    To: user.email,
    TemplateAlias: "password-reset",
    TemplateModel: {
      product_url: APP_ORIGIN,
      product_name: "pack your pack / fait ton sac",
      name: user.username,
      action_url: resetUrl,
      company_name: "serant",
      company_address: "serant.fr",
    },
  });
};

export default sendPasswordReset;
