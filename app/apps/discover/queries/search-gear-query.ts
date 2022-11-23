import { resolver } from "blitz";

import db from "db";

import searchGearSchema from "../schemas/search-gear-schema";

const searchGearQuery = resolver.pipe(
  resolver.zod(searchGearSchema),

  async ({ query, minWeight, maxWeight, sortBy, sortDir, skip, take }) => {
    //if (!query) return [];
    // { sort: sortDir, nulls: "last" }
    const search = query.split(" ").join(" | ");
    var orderBy = {};
    var filterBy = {};
    if (sortBy == "weight") {
      orderBy = { weight: sortDir };
      filterBy = { NOT: [{ weight: 0 }] };
    } else if (sortBy == "updatedAt") {
      orderBy = { updatedAt: sortDir };
      filterBy = { NOT: [{ updatedAt: null }] };
    } else if (sortBy == "price") {
      orderBy = { price: sortDir };
      filterBy = { NOT: [{ price: null }] };
    } else if (sortBy == "purchaseDate") {
      orderBy = { purchaseDate: sortDir };
      filterBy = { NOT: [{ purchaseDate: null }] };
    } else {
      orderBy = { name: sortDir };
      filterBy = { NOT: [{ name: "" }] };
    }
    return db.gear.findMany({
      take: take,
      skip: skip,

      where: {
        AND: [
          {
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
          },
          filterBy,
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

      orderBy: [orderBy],
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
