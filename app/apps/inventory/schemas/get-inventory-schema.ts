import { z } from "zod";

import { CategoryType } from "db";

const getInventorySchema = z.object({
  type: z.nativeEnum(CategoryType),
  username: z.string().nullable().optional(),
});

export default getInventorySchema;
