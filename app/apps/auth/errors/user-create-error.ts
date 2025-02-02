import SuperJson from "superjson";
import { t } from "i18next";

import { Prisma } from "db";
class UserCreateError extends Error {
  name = "UserCreateError";
  emailTaken = false;
  usernameTaken = false;

  constructor(error: unknown) {
    super(
      error instanceof Error
        ? error.message
        : t("UserCreateError", "There was an error signing up")
    );

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const meta = error?.meta as { target?: string[] };

        if (meta?.target?.includes("email")) {
          this.emailTaken = true;
        }

        if (meta?.target?.includes("username")) {
          this.usernameTaken = true;
        }
      }
    }
  }
}

SuperJson.registerClass(UserCreateError, "UserCreateError");
SuperJson.allowErrorProps("emailTaken", "usernameTaken");

export default UserCreateError;
