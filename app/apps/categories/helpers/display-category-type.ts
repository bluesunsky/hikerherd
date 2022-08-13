import type { CategoryType } from "db";

const displayCategoryType = (type: CategoryType) => {
  switch (type) {
    case "INVENTORY":
      return "l'inventaire";
    case "WISH_LIST":
      return "les souhaits";
  }
};

export default displayCategoryType;
