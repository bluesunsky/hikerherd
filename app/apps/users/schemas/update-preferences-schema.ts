import { z } from "zod";

import { WeightUnit, Currency, Language } from "db";

const updatePreferencesSchema = z.object({
  weightUnit: z.nativeEnum(WeightUnit),
  currency: z.nativeEnum(Currency),
  firstname: z.string().default("").nullable(),
  lastname: z.string().default("").nullable(),
  language: z.nativeEnum(Language),
});

export default updatePreferencesSchema;
