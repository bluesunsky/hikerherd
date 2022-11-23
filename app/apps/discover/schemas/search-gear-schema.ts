import { z } from "zod";

const searchGearSchema = z.object({
  query: z.string(),
  maxWeight: z.number().optional(),
  minWeight: z.number().optional(),
  sortBy: z.string().default("name"),
  sortDir: z.enum(["asc", "desc"]).default("asc"),
  skip: z.number().default(0),
  take: z.number().default(24),
});

export default searchGearSchema;
