import { z } from "zod";

import { Language } from "db";

const updateLanguageSchema = z.object({
  language: z.nativeEnum(Language),
});

export default updateLanguageSchema;
