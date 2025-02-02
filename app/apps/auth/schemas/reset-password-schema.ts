import { z } from "zod";

import passwordSchema from "./password-schema";

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passe ne sont pas identiques",
    path: ["passwordConfirmation"],
  });

export default resetPasswordSchema;
