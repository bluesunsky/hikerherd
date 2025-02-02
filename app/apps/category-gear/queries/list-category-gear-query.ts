import { resolver } from "blitz";

import db from "db";

import listCategoryGearSchema from "../schemas/list-category-gear-schema";

const listCategoryGearQuery = resolver.pipe(
  resolver.authorize(),
  resolver.zod(listCategoryGearSchema),

  async ({ type }, ctx) => {
    return db.categoryItem.findMany({
      where: {
        category: {
          userId: ctx.session.userId,
          type,
        },
      },
      select: {
        id: true,
        category: {
          select: {
            name: true,
            index: true,
          },
        },
        gear: {
          select: {
            id: true,
            name: true,
            manufacturer: true,
            kind: true,
            weight: true,
            price: true,
            currency: true,
            location: true,
            link: true,
            imageUrl: true,
            notes: true,
            consumable: true,
            replaceable: true,
            private: true,
            purchaseDate: true,
          },
        },
      },
    });
  }
);

export default listCategoryGearQuery;
