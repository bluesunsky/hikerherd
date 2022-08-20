import { z } from "zod";

import requiredStringSchema from "app/schemas/required-string-schema";

import { Currency } from "db";

const gearSchema = z.object({
  name: requiredStringSchema(),
  manufacturer: z.string().nullable().default(null),
  kind: z.string().nullable().default(null),
  weight: z.number(),
  imageUrl: z.string().url().nullable().default(null),
  notes: z.string().nullable().default(null),
  consumable: z.boolean().default(false),
  replaceable: z.boolean().default(false),
  private: z.boolean().default(false),
  price: z.number().nullable().default(null),
  currency: z.nativeEnum(Currency),
  link: z.string().url().nullable().default(null),
  purchaseDate: z.date().nullable().default(null),
});

export default gearSchema;
