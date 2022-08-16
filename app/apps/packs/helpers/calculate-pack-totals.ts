import type { DragAndDropState } from "app/components/drag-and-drop/contexts/gear-dnd-context";

const calculatePackTotals = (categories: DragAndDropState) => {
  let totalWeight = 0;
  let wornWeight = 0;
  let consumableWeight = 0;
  let baseWeight = 0;

  const weightedCategories = categories.map((category) => {
    return {
      ...category,
      weight: category.items.reduce((acc, item) => {
        const itemWeight = item.gear.weight * (item.quantity || 0);

        totalWeight += itemWeight;

        if (item.worn) {
          wornWeight += itemWeight;
        }

        if (item.gear.consumable) {
          consumableWeight += itemWeight;
        }

        if (!item.worn && !item.gear.consumable) {
          baseWeight += itemWeight;
        }

        return acc + itemWeight;
      }, 0),
      consumableWeight: category.items.reduce((acc, item) => {
        if (item.gear.consumable) {
          acc += item.gear.weight * (item.quantity || 0);
        }
        return acc;
      }, 0),
      wornWeight: category.items.reduce((acc, item) => {
        if (item.worn) {
          acc += item.gear.weight * (item.quantity || 0);
        }
        return acc;
      }, 0),
      baseWeight: category.items.reduce((acc, item) => {
        if (!item.worn && !item.gear.consumable) {
          acc += item.gear.weight * (item.quantity || 0);
        }

        return acc;
      }, 0),
      eur: category.items.reduce((acc, item) => {
        if (item.gear.currency == "EUR" && item.gear.price != null) {
          acc += item.gear.price * (item.quantity || 0);
        }
        return acc;
      }, 0),
      usd: category.items.reduce((acc, item) => {
        if (item.gear.currency == "USD" && item.gear.price != null) {
          acc += item.gear.price * (item.quantity || 0);
        }
        return acc;
      }, 0),
      gbp: category.items.reduce((acc, item) => {
        if (item.gear.currency == "GBP" && item.gear.price != null) {
          acc += item.gear.price * (item.quantity || 0);
        }
        return acc;
      }, 0),
    };
  });

  return {
    categories: weightedCategories,
    totalWeight,
    packWeight: totalWeight - wornWeight,
    baseWeight,
    wornWeight,
    consumableWeight,
  };
};

export default calculatePackTotals;
