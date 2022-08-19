import type { Currency, WeightUnit } from "db";
import type { CurrencySign } from "./sign-to-currency";
import type { WeightSymbol } from "./weight-unit-to-symbol";

import weightUnitToSymbol from "./weight-unit-to-symbol";
import { gToOz } from "./display-weight";
import displayCurrency from "./display-currency";

export type ParsedCsvItem = {
  worn?: boolean | null;
  quantity?: number | null;
  notes?: string | null;
  gear: {
    name: string;
    manufacturer: string | null;
    weight: number;
    price: number | null;
    currency: Currency;
    consumable: boolean;
    replaceable: boolean;
    link: string | null;
    notes: string | null;
    imageUrl: string | null;
    purchaseDate: Date | null;
  };
};

export type CsvItem = {
  name: string;
  manufacturer: string | null;
  category: string;
  weight: number;
  unit: WeightSymbol;
  notes: string | null;
  price: number | null;
  currency: CurrencySign;
  link: string | null;
  image: string | null;
  consumable: string | null;
  replaceable: string | null;
  worn: string | null;
  quantity: number;
  purchaseDate: Date | null;
};

const itemToCsvFormat = ({
  category,
  item,
  weightUnit = "METRIC",
}: {
  category: string;
  item: ParsedCsvItem;
  weightUnit?: WeightUnit;
}): CsvItem => {
  return {
    name: item.gear.name,
    manufacturer: item.gear.manufacturer,
    category: category,
    weight:
      weightUnit === "METRIC" ? item.gear.weight : gToOz(item.gear.weight),
    unit: weightUnitToSymbol(weightUnit),
    notes: item.notes || item.gear.notes,
    price: item.gear.price && item.gear.price / 100,
    currency: displayCurrency(item.gear.currency),
    link: item.gear.link,
    image: item.gear.imageUrl,
    consumable: item.gear.consumable ? "consumable" : null,
    replaceable: item.gear.replaceable ? "replaceable" : null,
    worn: item.worn ? "worn" : null,
    quantity: item.quantity || 1,
    purchaseDate: item.gear.purchaseDate,
  };
};

export default itemToCsvFormat;
