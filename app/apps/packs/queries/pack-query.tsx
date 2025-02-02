import { AuthorizationError, NotFoundError, resolver } from "blitz";

import idSchema from "app/schemas/id-schema";

import db from "db";

const packQuery = resolver.pipe(
  resolver.authorize(),
  resolver.zod(idSchema),

  async ({ id }, ctx) => {
    const pack = await db.pack.findUnique({
      where: { id },
      select: {
        id: true,
        notes: true,
        name: true,
        private: true,
        userId: true,
      },
    });

    if (!pack) {
      throw new NotFoundError();
    }

    if (pack.userId !== ctx.session.userId && ctx.session.role === "USER") {
      throw new AuthorizationError();
    }

    return pack;
  }
);

export default packQuery;
