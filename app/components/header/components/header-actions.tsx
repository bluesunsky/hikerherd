import type { FC } from "react";

import { useContext } from "react";

import { useTranslation } from "react-i18next";
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
import LngPicker from "./lng-picker";

type HeaderActionsProps = {
  toggleDrawer: () => void;
};

const HeaderActions: FC<HeaderActionsProps> = ({ toggleDrawer }) => {
  const { toggleWeightUnits, weightUnit } = useContext(userPreferencesContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  return (
    <HStack spacing={1}>
      <HeaderIconButton
        label={t("OpenMenu", "Open menu")}
        onClick={toggleDrawer}
        icon={<Icon as={FaBars} w={5} h={5} />}
      />
      <HeaderIconButton
        label={
          colorMode === "dark"
            ? t("NightToDay", "You'r using night hike. \nClick to use day hike")
            : t("DayToNight", "You'r using day hike. \nClick to use night hike")
        }
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? FaMoon : FaSun} w={5} h={5} />}
      />
      <HeaderIconButton
        label={
          weightUnit === WeightUnit.METRIC
            ? t(
                "MetricToImperial",
                "You'r using metric units. \nClick to use imperial units"
              )
            : t(
                "ImperialToMetric",
                "You'r using imperial units. \nClick to use metric units"
              )
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
      <LngPicker></LngPicker>
    </HStack>
  );
};

export default HeaderActions;
