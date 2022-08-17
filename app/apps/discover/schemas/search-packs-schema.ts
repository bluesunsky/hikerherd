import { z } from "zod";

const searchPacksSchema = z.object({
  query: z.string(),
  skip: z.number().default(0),
  take: z.number().default(24),
});

export default searchPacksSchema;
