import type { ParsedCsvItem } from "./item-to-csv-format";

import { z } from "zod";
import papaparse from "papaparse";

import { ozTog } from "./display-weight";
import signToCurrency from "./sign-to-currency";

type ParsedCsvResultItem = ParsedCsvItem & { category: string };
type ParsedCsvResult = {
  [category: string]: ParsedCsvResultItem[];
};

const csvItemSchema = z.object({
  name: z.string().min(1),
  manufacturer: z.string().min(1).nullable().optional(),
  kind: z.string().min(1).nullable().optional(),
  category: z.string().min(1),
  weight: z.number().min(0),
  unit: z.enum(["gram", "ounce"]),
  notes: z.string().min(1).nullable().optional(),
  price: z.number().min(0).nullable().optional(),
  currency: z.enum(["$", "£", "€"]).nullable().optional(),
  location: z.string().min(1).nullable().optional(),
  link: z.string().url().nullable().optional(),
  image: z.string().url().nullable().optional(),
  consumable: z.union([z.string(), z.boolean()]).nullable().optional(),
  replaceable: z.union([z.string(), z.boolean()]).nullable().optional(),
  private: z.union([z.string(), z.boolean()]).nullable().optional(),
  worn: z.union([z.string(), z.boolean()]).nullable().optional(),
  quantity: z.number().int().min(0).nullable().optional(),
  purchaseDate: z.date().nullable().optional(),
});

const parseCsvFile = (file: string): ParsedCsvResult => {
  const { data } = papaparse.parse(file, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase(),
    dynamicTyping: {
      manufacturer: true,
      kind: true,
      weight: true,
      price: true,
      currency: true,
      consumable: true,
      replaceable: true,
      private: true,
      worn: true,
      quantity: true,
      notes: true,
      link: true,
      image: true,
      purchaseDate: true,
    },
  });

  const mappedData: ParsedCsvResultItem[] = data.map((item) => {
    const valid = csvItemSchema.parse(item);

    return {
      category: valid.category,
      worn: !!valid.worn,
      quantity: valid.quantity || 1,
      notes: valid.notes || null,
      gear: {
        name: valid.name,
        manufacturer: valid.manufacturer || null,
        kind: valid.kind || null,
        weight: valid.unit === "gram" ? valid.weight : ozTog(valid.weight),
        price: valid.price ? Math.round(valid.price * 100) : null,
        currency: signToCurrency(valid.currency),
        consumable: !!valid.consumable,
        replaceable: !!valid.replaceable,
        private: !!valid.private,
        location: valid.location || null,
        link: valid.link || null,
        notes: valid.notes || null,
        imageUrl: valid.image || null,
        purchaseDate: valid.purchaseDate || null,
      },
    };
  });

  return mappedData.reduce((groups, item) => {
    const items = groups[item.category] || [];

    return {
      ...groups,
      [item.category]: [...items, item],
    };
  }, {} as ParsedCsvResult);
};

export default parseCsvFile;
