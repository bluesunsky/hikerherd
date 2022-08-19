import { AuthorizationError, NotFoundError, resolver } from "blitz";

import db from "db";

import updateCategoryGearSchema from "../schemas/update-category-gear-schema";

const updateCategoryGearMutation = resolver.pipe(
  resolver.zod(updateCategoryGearSchema),
  resolver.authorize(),

  async ({ id, ...values }, ctx) => {
    const item = await db.categoryItem.findUnique({
      where: { id },
      select: {
        gearId: true,
        category: { select: { userId: true } },
      },
    });

    if (!item) {
      throw new NotFoundError();
    }

    if (
      item.category.userId !== ctx.session.userId &&
      ctx.session.role === "USER"
    ) {
      throw new AuthorizationError();
    }

    return db.gear.update({
      where: { id: item.gearId },
      data: {
        name: values.name,
        manufacturer: values.manufacturer,
        weight: values.weight,
        imageUrl: values.imageUrl,
        link: values.link,
        consumable: values.consumable,
        replaceable: values.replaceable,
        notes: values.notes,
        price: values.price,
        currency: values.currency,
        purchaseDate: values.purchaseDate,
      },
    });
  }
);

export default updateCategoryGearMutation;
