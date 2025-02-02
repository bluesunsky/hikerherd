import type { Currency } from "db";

import { faker } from "@faker-js/faker";

export type GearValues = {
  name?: string;
  manufacturer?: string;
  kind?: string;
  weight?: number;
  imageUrl?: string;
  location?: string;
  link?: string;
  notes?: string;
  consumable?: boolean;
  replaceable?: boolean;
  private?: boolean;
  price?: number;
  currency?: Currency;
  purchaseDate?: Date | null;
};

const getGearData = (values: GearValues = {}) => ({
  name: faker.random.word(),
  manufacturer: faker.random.words(10),
  kind: faker.random.words(10),
  weight: faker.datatype.number({ min: 20, max: 1200 }),
  imageUrl: faker.internet.url(),
  location: faker.random.words(10),
  link: faker.internet.url(),
  notes: faker.random.words(10),
  consumable: faker.datatype.boolean(),
  replaceable: faker.datatype.boolean(),
  private: faker.datatype.boolean(),
  price: faker.datatype.number({ min: 100, max: 1000000 }),
  currency: "USD" as Currency,
  purchaseDate: faker.datatype.datetime(),
  ...values,
});

export default getGearData;
