import { AuthorizationError, NotFoundError, resolver } from "blitz";

import getNextPackItemIndex from "app/apps/pack-gear/functions/get-next-pack-item-index";
import findOrCreateCategoryByName from "app/apps/categories/functions/find-or-create-category-by-name";
import getNextItemIndex from "app/apps/category-gear/functions/get-next-item-index";

import db from "db";

import addGearToPackSchema from "../schemas/add-gear-to-pack-schema";

const addGearToPackMutation = resolver.pipe(
  resolver.zod(addGearToPackSchema),
  resolver.authorize(),

  async ({ categoryId, gearId }, ctx) => {
    const category = await db.packCategory.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
        pack: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundError();
    }

    if (
      category.pack.userId !== ctx.session.userId &&
      ctx.session.role === "USER"
    ) {
      throw new AuthorizationError();
    }

    const gear = await db.gear.findUnique({ where: { id: gearId } });

    if (!gear) {
      throw new NotFoundError();
    }

    let itemGearId = gear.id;

    if (gear.userId !== ctx.session.userId && ctx.session.role === "USER") {
      const clone = await db.gear.create({
        data: {
          name: gear.name,
          manufacturer: gear.manufacturer,
          kind: gear.kind,
          imageUrl: gear.imageUrl,
          location: gear.location,
          link: gear.link,
          notes: gear.notes,
          consumable: gear.consumable,
          replaceable: gear.replaceable,
          private: gear.private,
          weight: gear.weight,
          price: gear.price,
          currency: gear.currency,
          purchaseDate: gear.purchaseDate,
          userId: ctx.session.userId,
          clonedFromId: gear.id,
        },
      });

      itemGearId = clone.id;
    }

    const item = await db.$transaction(async (prisma) => {
      const index = await getNextPackItemIndex(prisma, ctx, {
        categoryId,
      });

      return prisma.packCategoryItem.create({
        data: {
          categoryId,
          gearId: itemGearId,
          worn: false,
          ready: false,
          index,
        },
      });
    });

    const inventoryItem = await db.categoryItem.findFirst({
      where: { gearId: gear.id, category: { userId: ctx.session.userId } },
    });

    if (!inventoryItem) {
      await db.$transaction(async (prisma) => {
        const inventoryCategory = await findOrCreateCategoryByName(
          prisma,
          ctx,
          {
            categoryName: category.name,
          }
        );

        const index = await getNextItemIndex(prisma, ctx, {
          categoryId: inventoryCategory.id,
        });

        await prisma.categoryItem.create({
          data: {
            index,
            categoryId: inventoryCategory.id,
            gearId: item.gearId,
          },
        });
      });
    }

    return item;
  }
);

export default addGearToPackMutation;
