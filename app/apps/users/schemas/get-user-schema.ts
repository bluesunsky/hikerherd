import { z } from "zod";

const getUserSchema = z.object({
  username: z.string(),
  withPrivate: z.boolean().default(false),
});

export default getUserSchema;
