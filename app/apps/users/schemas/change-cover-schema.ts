import { z } from "zod";

const changeCoverSchema = z.object({
  publicId: z.string(),
  version: z.number(),
});

export default changeCoverSchema;
