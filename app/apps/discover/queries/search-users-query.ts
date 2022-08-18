import { resolver } from "blitz";

import calculateUserSummary from "app/apps/users/helpers/calculate-user-summary";

import db from "db";

import searchPacksSchema from "../schemas/search-packs-schema";

const searchUsersQuery = resolver.pipe(
  resolver.zod(searchPacksSchema),

  async ({ query, skip, take }) => {
    if (!query) query = "%";
    const search = query.split(" ").join(" | ");

    const users = await db.user.findMany({
      take: take,
      skip: skip,

      where: {
        OR: [
          { username: { search, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
          { firstname: { search, mode: "insensitive" } },
          { firstname: { contains: query, mode: "insensitive" } },
          { lastname: { search, mode: "insensitive" } },
          { lastname: { contains: query, mode: "insensitive" } },
        ],
      },

      orderBy: { username: "asc" },
    });

    return users.map((user) => {
      const { nbPacks, nbGears, nbWishs } = calculateUserSummary();

      return {
        username: user.username,
        id: user.id,
        avatar_id: user.avatar_id,
        avatar_version: user.avatar_version,
        cover_id: user.cover_id,
        cover_version: user.cover_version,
        totals: {
          nbPacks,
          nbGears,
          nbWishs,
        },
      };
    });
  }
);

export default searchUsersQuery;
