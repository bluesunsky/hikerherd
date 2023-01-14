import { AuthorizationError, NotFoundError, resolver } from "blitz";

import db from "db";

import updatePackGearSchema from "../schemas/update-pack-gear-schema";

const updatePackGearMutation = resolver.pipe(
  resolver.zod(updatePackGearSchema),
  resolver.authorize(),

  async ({ id, ...values }, ctx) => {
    const item = await db.packCategoryItem.findUnique({
      where: { id },
      select: {
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

    await db.packCategoryItem.update({
      where: { id },
      data: {
        worn: values.worn,
        gear: {
          update: {
            name: values.name,
            manufacturer: values.manufacturer,
            kind: values.kind,
            weight: values.weight,
            imageUrl: values.imageUrl,
            location: values.location,
            link: values.link,
            notes: values.notes,
            consumable: values.consumable,
            replaceable: values.replaceable,
            private: values.private,
            price: values.price,
            currency: values.currency,
            purchaseDate: values.purchaseDate,
          },
        },
      },
    });
  }
);

export default updatePackGearMutation;
