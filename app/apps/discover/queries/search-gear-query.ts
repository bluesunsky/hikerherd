import { resolver } from "blitz";

import db from "db";

import searchGearSchema from "../schemas/search-gear-schema";

const searchGearQuery = resolver.pipe(
  resolver.zod(searchGearSchema),

  async ({ query, minWeight, maxWeight, skip, take }) => {
    //if (!query) return [];

    const search = query.split(" ").join(" | ");

    return db.gear.findMany({
      take: take,
      skip: skip,

      where: {
        OR: [
          { name: { search, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
          { manufacturer: { search, mode: "insensitive" } },
          { manufacturer: { contains: query, mode: "insensitive" } },
          { kind: { search, mode: "insensitive" } },
          { kind: { contains: query, mode: "insensitive" } },
          { notes: { search, mode: "insensitive" } },
          { notes: { contains: query, mode: "insensitive" } },
        ],
        clonedFromId: null,
        private: false,
        weight: { gte: minWeight, lte: maxWeight },
      },

      include: {
        _count: {
          select: { clones: true },
        },
        user: {
          select: {
            avatar_id: true,
            avatar_version: true,
            username: true,
          },
        },
      },

      orderBy: [{ name: "asc" }],
      /*orderBy: [
        {
          _relevance: {
            fields: ["name", "notes"],
            search,
            sort: "asc",
          },
        },
        {
          clones: {
            _count: "desc",
          },
        },
      ],*/
    });
  }
);

export default searchGearQuery;
