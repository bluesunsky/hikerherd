import { resolver } from "blitz";

import db from "db";

import getInventorySchema from "../schemas/get-inventory-schema";

const inventoryQuery = resolver.pipe(
  resolver.zod(getInventorySchema),

  async ({ type, username }, ctx) => {
    var userWhere, withPrivate;
    if (username) {
      userWhere = { username: username };
      withPrivate = false;
    } else {
      userWhere = { id: ctx.session.userId ? ctx.session.userId : "" };
      withPrivate = true;
    }
    const user = await db.user.findUnique({
      where: userWhere,
      select: {
        categories: {
          where: { type },
          orderBy: { index: "asc" },
          select: {
            id: true,
            name: true,
            items: {
              orderBy: { index: "asc" },
              select: {
                id: true,
                quantity: true,
                gear: {
                  select: {
                    id: true,
                    name: true,
                    manufacturer: true,
                    kind: true,
                    weight: true,
                    price: true,
                    currency: true,
                    consumable: true,
                    replaceable: true,
                    private: true,
                    location: withPrivate,
                    link: true,
                    notes: true,
                    imageUrl: true,
                    purchaseDate: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!withPrivate && user) {
      user.categories.forEach(
        (cat: any) =>
          (cat.items = cat.items.filter((item: any) => !item.gear.private))
      );
    }

    return user?.categories || [];
  }
);

export default inventoryQuery;
