import { AuthorizationError, NotFoundError, resolver } from "blitz";

import getNextItemIndex from "app/apps/category-gear/functions/get-next-item-index";

import db from "db";

import addToInventorySchema from "../schemas/add-to-inventory-schema";

const addToInventoryMutation = resolver.pipe(
  resolver.zod(addToInventorySchema),
  resolver.authorize(),

  async ({ categoryId, gearId }, ctx) => {
    const category = await db.category.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!category) {
      throw new NotFoundError();
    }

    if (category.userId !== ctx.session.userId && ctx.session.role === "USER") {
      throw new AuthorizationError();
    }

    const gear = await db.gear.findUnique({ where: { id: gearId } });

    if (!gear) {
      throw new NotFoundError();
    }

    const clone = await db.gear.create({
      data: {
        name: gear.name,
        manufacturer: gear.manufacturer,
        kind: gear.kind,
        imageUrl: gear.imageUrl,
        location: gear.location,
        link: gear.link,
        //notes: gear.notes,
        consumable: gear.consumable,
        //replaceable: gear.replaceable,
        //private: gear.private,
        weight: gear.weight,
        price: gear.price,
        currency: gear.currency,
        userId: ctx.session.userId,
        clonedFromId: gear.id,
        //purchaseDate: gear.purchaseDate,
      },
    });

    return db.$transaction(async (prisma) => {
      const index = await getNextItemIndex(prisma, ctx, {
        categoryId: category.id,
      });

      return prisma.categoryItem.create({
        data: {
          gearId: clone.id,
          categoryId: category.id,
          index,
        },
      });
    });
  }
);

export default addToInventoryMutation;
