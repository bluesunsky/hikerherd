import type { CategoryType } from "db";

import { t } from "i18next";
const displayCategoryType = (type: CategoryType) => {
  switch (type) {
    case "INVENTORY":
      return t("InventoryType", "inventory");
    case "WISH_LIST":
      return t("WishListType", "wish list");
    case "ARCHIVE":
      return t("ArchiveType", "archive");
  }
};

export default displayCategoryType;
