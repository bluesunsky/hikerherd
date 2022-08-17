import { z } from "zod";

const searchGearSchema = z.object({
  query: z.string(),
  maxWeight: z.number().optional(),
  minWeight: z.number().optional(),
  skip: z.number().default(0),
  take: z.number().default(24),
});

export default searchGearSchema;
