import type { FC } from "react";

import { useContext } from "react";

import { useTranslation } from "react-i18next";
import { MenuItem, MenuList } from "@chakra-ui/menu";
import { FaEdit, FaTrash } from "react-icons/fa";

import gearOrganizerContext from "../contexts/gear-organizer-context";

type GearOrganizerCategoryMenuProps = {
  category: { id: string };
};

const GearOrganizerCategoryMenu: FC<GearOrganizerCategoryMenuProps> = ({
  category,
}) => {
  const { editCategory, deleteCategory } = useContext(gearOrganizerContext);
  const { t } = useTranslation();
  return (
    <MenuList>
      <MenuItem icon={<FaEdit />} onClick={() => editCategory(category.id)}>
        {t("EditCategory", "Edit")}
      </MenuItem>
      <MenuItem icon={<FaTrash />} onClick={() => deleteCategory(category.id)}>
        {t("DeleteCategory", "Delete")}
      </MenuItem>
    </MenuList>
  );
};

export default GearOrganizerCategoryMenu;
