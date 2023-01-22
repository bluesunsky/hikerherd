import { AuthorizationError, NotFoundError, resolver } from "blitz";

import idSchema from "app/schemas/id-schema";

import db from "db";

const togglePackGearReadyMutation = resolver.pipe(
  resolver.zod(idSchema),
  resolver.authorize(),

  async ({ id }, ctx) => {
    const item = await db.packCategoryItem.findUnique({
      where: { id },
      select: {
        ready: true,
        category: {
          select: {
            pack: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!item) {
      throw new NotFoundError();
    }

    if (
      item.category.pack.userId !== ctx.session.userId &&
      ctx.session.role === "USER"
    ) {
      throw new AuthorizationError();
    }

    return db.packCategoryItem.update({
      where: { id },
      data: { ready: !item.ready },
    });
  }
);

export default togglePackGearReadyMutation;
