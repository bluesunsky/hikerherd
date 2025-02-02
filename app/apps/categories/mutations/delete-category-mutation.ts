import { AuthorizationError, NotFoundError, resolver } from "blitz";

import idSchema from "app/schemas/id-schema";
import conditionallyDeleteGear from "app/apps/gear/functions/conditionally-delete-gear";

import db from "db";

import decrementCategoryIndexesAfter from "../functions/decrement-category-indexes-after";

const deleteCategoryMutation = resolver.pipe(
  resolver.zod(idSchema),
  resolver.authorize(),

  async ({ id }, ctx) => {
    return db.$transaction(async (prisma) => {
      const category = await prisma.category.findUnique({
        where: { id },
        select: {
          type: true,
          index: true,
          userId: true,
          items: {
            select: { gearId: true },
          },
        },
      });

      if (!category) {
        throw new NotFoundError();
      }

      if (
        category.userId !== ctx.session.userId &&
        ctx.session.role === "USER"
      ) {
        throw new AuthorizationError();
      }

      await decrementCategoryIndexesAfter(prisma, ctx, {
        type: category.type,
        index: category.index,
      });

      await prisma.categoryItem.deleteMany({
        where: { categoryId: id },
      });

      await conditionallyDeleteGear(prisma, ctx, {
        ids: category.items.map(({ gearId }) => gearId),
      });

      return prisma.category.delete({
        where: { id },
      });
    });
  }
);

export default deleteCategoryMutation;
