import type { CurrencySign } from "app/helpers/sign-to-currency";

import { faker } from "@faker-js/faker";

import displayCurrency from "app/helpers/display-currency";

import getGearData from "./get-gear-data";

export type TestCsvItem = {
  name: string;
  manufacturer: string | null;
  kind: string | null;
  category: string;
  weight: string;
  unit: string;
  notes: string;
  price: string;
  currency: CurrencySign | "";
  location: string | null;
  link: string;
  image: string;
  consumable: string;
  replaceable: string;
  private: string;
  worn: string;
  quantity: string;
  purchaseDate: Date | null;
};

const getCsvItem = (values: Partial<TestCsvItem> = {}): TestCsvItem => {
  const gear = getGearData();

  return {
    name: gear.name,
    manufacturer: gear.manufacturer,
    kind: gear.kind,
    category: faker.random.word(),
    unit: "gram",
    notes: gear.notes,
    currency: displayCurrency(gear.currency),
    location: gear.location,
    link: gear.link,
    image: gear.imageUrl,
    weight: `${gear.weight}`,
    price: `${gear.price / 100}`,
    consumable: gear.consumable ? "consumable" : "",
    replaceable: gear.replaceable ? "replaceable" : "",
    private: gear.private ? "private" : "",
    worn: "",
    quantity: `${1}`,
    purchaseDate: null,
    ...values,
  };
};

export default getCsvItem;
