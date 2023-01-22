import { NotFoundError, resolver } from "blitz";

import idSchema from "app/schemas/id-schema";

import db from "db";

const packOrganizerQuery = resolver.pipe(
  resolver.zod(idSchema),

  async ({ id }, ctx) => {
    const pack = await db.pack.findUnique({
      where: { id },
      select: {
        id: true,
        notes: true,
        name: true,
        userId: true,
        private: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar_id: true,
            avatar_version: true,
          },
        },
        categories: {
          orderBy: { index: "asc" },
          select: {
            id: true,
            name: true,
            items: {
              orderBy: { index: "asc" },
              select: {
                id: true,
                worn: true,
                ready: true,
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
                    location: true,
                    link: true,
                    notes: true,
                    imageUrl: true,
                    purchaseDate: true,
                    categoryItems: {
                      select: {
                        category: {
                          select: {
                            name: true,
                            type: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (
      !pack ||
      (pack.private &&
        pack.userId !== ctx.session.userId &&
        ctx.session.role === "USER")
    ) {
      throw new NotFoundError();
    }
    if (pack.userId !== ctx.session.userId) {
      pack.categories.forEach(
        (cat) =>
          (cat.items = cat.items
            .filter((item) => !item.gear.private)
            .map((item) => {
              item.gear.location = null;
              return item;
            }))
      );
    }

    return pack;
  }
);

export default packOrganizerQuery;
