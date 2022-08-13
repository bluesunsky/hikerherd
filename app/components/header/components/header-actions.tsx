import type { FC } from "react";

import { useContext } from "react";

import { HStack } from "@chakra-ui/layout";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaFlagUsa,
  FaGlobeEurope,
} from "react-icons/fa";
import Icon from "@chakra-ui/icon";
import { useColorMode } from "@chakra-ui/react";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";

import HeaderIconButton from "./header-icon-button";

type HeaderActionsProps = {
  toggleDrawer: () => void;
};

const HeaderActions: FC<HeaderActionsProps> = ({ toggleDrawer }) => {
  const { toggleWeightUnits, weightUnit } = useContext(userPreferencesContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack spacing={1}>
      <HeaderIconButton
        label="Ouvrir le menu"
        onClick={toggleDrawer}
        icon={<Icon as={FaBars} w={5} h={5} />}
      />
      <HeaderIconButton
        label={
          colorMode === "dark"
            ? "Utiliser le mode jour"
            : "Utiliser le mode nuit"
        }
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? FaMoon : FaSun} w={5} h={5} />}
      />
      <HeaderIconButton
        label={
          weightUnit === "METRIC"
            ? "Utiliser les unités impériales"
            : "Utiliser les unités métriques"
        }
        onClick={toggleWeightUnits}
        icon={
          <Icon
            as={weightUnit === "METRIC" ? FaGlobeEurope : FaFlagUsa}
            w={5}
            h={5}
          />
        }
      />
    </HStack>
  );
};

export default HeaderActions;
