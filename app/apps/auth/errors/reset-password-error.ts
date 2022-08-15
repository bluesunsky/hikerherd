import SuperJson from "superjson";

class ResetPasswordError extends Error {
  name = "ResetPasswordError";
  message =
    "Le lien de votre demande de réinitialisation est invalide ou à expiré.";
}

SuperJson.registerClass(ResetPasswordError, "ResetPasswordError");

export default ResetPasswordError;
