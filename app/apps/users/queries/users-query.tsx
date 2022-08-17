import { resolver } from "blitz";

import db from "db";

import calculateUserSummary from "../helpers/calculate-user-summary";
const usersQuery = resolver.pipe(
  resolver.authorize(),

  async () => {
    const users = await db.user.findMany({
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

export default usersQuery;
