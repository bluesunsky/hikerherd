import { resolver } from "blitz";

import db from "db";

import updateLanguageSchema from "../schemas/update-language-schema";

const updateLanguageMutation = resolver.pipe(
  resolver.zod(updateLanguageSchema),
  resolver.authorize(),

  async ({ language }, ctx) => {
    return await db.user.update({
      where: { id: ctx.session.userId },
      data: {
        language,
      },
    });
  }
);

export default updateLanguageMutation;
