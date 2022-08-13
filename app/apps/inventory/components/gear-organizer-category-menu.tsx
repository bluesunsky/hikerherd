import type { FC } from "react";

import { useContext } from "react";

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

  return (
    <MenuList>
      <MenuItem icon={<FaEdit />} onClick={() => editCategory(category.id)}>
        Modifier
      </MenuItem>
      <MenuItem icon={<FaTrash />} onClick={() => deleteCategory(category.id)}>
        Supprimer
      </MenuItem>
    </MenuList>
  );
};

export default GearOrganizerCategoryMenu;
