import type { CategoryType } from "db";
import type { FC } from "react";
import type { DragAndDropItem } from "app/components/drag-and-drop/contexts/gear-dnd-context";

import { useContext } from "react";
import { useMutation } from "blitz";

import { useTranslation } from "react-i18next";
import { MenuItem, MenuList } from "@chakra-ui/menu";
import { FaArchive, FaEdit, FaList, FaStar, FaTrash } from "react-icons/fa";

import QuantityPicker from "app/components/quantity-picker";
import updateCategoryGearQuantityMutation from "app/apps/category-gear/mutations/update-category-gear-quantity-mutation";

import gearOrganizerContext from "../contexts/gear-organizer-context";

type GearOrganizerItemMenuProps = {
  item: DragAndDropItem;
  type: CategoryType;
};

const GearOrganizerItemMenu: FC<GearOrganizerItemMenuProps> = ({
  item,
  type,
}) => {
  const { t } = useTranslation();
  const { editItem, deleteItem, toInventory, toWishList, toArchive, refetch } =
    useContext(gearOrganizerContext);

  const [updateQuantity, { isLoading }] = useMutation(
    updateCategoryGearQuantityMutation
  );

  return (
    <MenuList>
      <MenuItem icon={<FaEdit />} onClick={() => editItem(item.id)}>
        {t("EditGear", "Edit")}
      </MenuItem>
      <MenuItem icon={<FaTrash />} onClick={() => deleteItem(item.id)}>
        {t("DeleteGear", "Delete")}
      </MenuItem>

      {type === "WISH_LIST" && (
        <MenuItem icon={<FaList />} onClick={() => toInventory(item.id)}>
          {t("MoveToInventory", "Move to inventory")}
        </MenuItem>
      )}

      {type === "INVENTORY" && (
        <>
          <MenuItem icon={<FaStar />} onClick={() => toWishList(item.id)}>
            {t("MoveToWishList", "Move to wish list")}
          </MenuItem>
          <MenuItem icon={<FaArchive />} onClick={() => toArchive(item.id)}>
            {t("MoveToArchive", "Move to archive")}
          </MenuItem>
        </>
      )}
      {type === "ARCHIVE" && (
        <MenuItem icon={<FaList />} onClick={() => toInventory(item.id)}>
          {t("MoveToInventory", "Move to inventory")}
        </MenuItem>
      )}

      <QuantityPicker
        value={item.quantity}
        isLoading={isLoading}
        onDecrement={async () => {
          await updateQuantity({ id: item.id, type: "decrement" });
          await refetch();
        }}
        onIncrement={async () => {
          await updateQuantity({ id: item.id, type: "increment" });
          await refetch();
        }}
      />
    </MenuList>
  );
};

export default GearOrganizerItemMenu;
