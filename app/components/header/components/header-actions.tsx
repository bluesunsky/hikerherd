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
import { WeightUnit } from "@prisma/client";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";

import HeaderIconButton from "./header-icon-button";

type HeaderActionsProps = {
  toggleDrawer: () => void;
};

const HeaderActions: FC<HeaderActionsProps> = ({ toggleDrawer }) => {
  const { toggleWeightUnits, weightUnit } = useContext(userPreferencesContext);
  const { colorMode, toggleColorMode } = useColorMode();

  /*
<HeaderIconButton
        label={
          language === Language.FR
            ? "Utiliser la version anglaise"
            : "Utiliser la version française"
        }
        onClick={() =>
          setLanguage(language === Language.FR ? Language.EN : Language.FR)
        }
        icon={
          <Icon
            as={language === Language.FR ? GiBread : GiHamburger}
            w={5}
            h={5}
          />
        }
      />
  */
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
          weightUnit === WeightUnit.METRIC
            ? "Utiliser les unités impériales"
            : "Utiliser les unités métriques"
        }
        onClick={toggleWeightUnits}
        icon={
          <Icon
            as={weightUnit === WeightUnit.METRIC ? FaGlobeEurope : FaFlagUsa}
            w={5}
            h={5}
          />
        }
      />
    </HStack>
  );
};

export default HeaderActions;
