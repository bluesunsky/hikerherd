import { NotFoundError, resolver } from "blitz";

import calculatePackTotals from "app/apps/packs/helpers/calculate-pack-totals";

import db from "db";

import getUserSchema from "../schemas/get-user-schema";

const userQuery = resolver.pipe(
  resolver.zod(getUserSchema),

  async ({ username }, ctx) => {
    const withPrivate = ctx.session.role && ctx.session.role !== "USER";
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        avatar_id: true,
        avatar_version: true,
        cover_id: true,
        cover_version: true,
        packs: {
          where: !withPrivate ? { private: false } : {},
          orderBy: { updatedAt: "desc" },
          include: {
            categories: {
              include: {
                items: {
                  include: {
                    gear: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError();
    }

    const packs = user.packs.map((pack) => {
      const {
        baseWeight,
        totalWeight,
        packWeight,
        wornWeight,
        consumableWeight,
      } = calculatePackTotals(pack.categories);

      return {
        name: pack.name,
        id: pack.id,
        private: pack.private,
        totals: {
          baseWeight,
          totalWeight,
          packWeight,
          wornWeight,
          consumableWeight,
        },
      };
    });

    return { ...user, packs };
  }
);

export default userQuery;
