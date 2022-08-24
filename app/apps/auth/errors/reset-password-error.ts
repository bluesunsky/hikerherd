import SuperJson from "superjson";
import { t } from "i18next";
class ResetPasswordError extends Error {
  name = "ResetPasswordError";
  message = t(
    "SendResetEmailExpiredError",
    "Your reset password link is invalid or it has expired."
  );
}

SuperJson.registerClass(ResetPasswordError, "ResetPasswordError");

export default ResetPasswordError;
