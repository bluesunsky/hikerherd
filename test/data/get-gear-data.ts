import type { Currency } from "db";

import { faker } from "@faker-js/faker";

export type GearValues = {
  name?: string;
  weight?: number;
  imageUrl?: string;
  link?: string;
  notes?: string;
  consumable?: boolean;
  price?: number;
  currency?: Currency;
};

const getGearData = (values: GearValues = {}) => ({
  id: faker.random.number({ min: 1, max: 1000 }),
  name: faker.random.word(),
  weight: faker.datatype.number({ min: 20, max: 1200 }),
  imageUrl: faker.internet.url(),
  link: faker.internet.url(),
  notes: faker.random.words(10),
  consumable: faker.datatype.boolean(),
  price: faker.datatype.number({ min: 100, max: 1000000 }),
  currency: "USD" as Currency,
  ...values,
});

export default getGearData;
