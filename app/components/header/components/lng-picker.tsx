import type { FC } from "react";

import { useContext } from "react";

import { Tooltip } from "@chakra-ui/tooltip";
import { useTranslation } from "react-i18next";
import { Icon } from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Language } from "@prisma/client";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";

const DeIcon = () => (
  <Icon borderRadius="5px" viewBox="0 0 30 30" w={5} h={5}>
    <path d="M0,0 h30 v10 h-30 z" fill="#000" />
    <path d="M0,10 h30 v10 h-30 z" fill="#D00" />
    <path d="M0,20 h30 v10 h-30 z" fill="#FFCE00" />
  </Icon>
);

const EnIcon = () => (
  <Icon borderRadius="5px" viewBox="0 0 60 60" w={5} h={5}>
    <path d="M0,0 v60 h60 v-60 z" fill="#012169" />
    <path d="M0,0 L60,60 M60,0 L0,60" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v60 M0,30 h60" stroke="#fff" strokeWidth="12" />
    <path d="M30,0 v60 M0,30 h60" stroke="#C8102E" strokeWidth="6" />
  </Icon>
);

const EsIcon = () => (
  <Icon borderRadius="5px" viewBox="0 0 60 60" w={5} h={5}>
    <path d="M0,0 v60 h60 v-60 z" fill="#c60b1e" />
    <path d="M0,15 v30 h60 v-30 z" fill="#ffc400" />
  </Icon>
);

const FrIcon = () => (
  <Icon borderRadius="5px" viewBox="0 0 30 30" w={5} h={5}>
    <path d="M0,0 v30 h10 v-30 z" fill="#ED2939" />
    <path d="M10,0 v30 h10 v-30 z" fill="#fff" />
    <path d="M20,0 v30 h10 v-30 z" fill="#002395" />
  </Icon>
);

const ItIcon = () => (
  <Icon borderRadius="5px" viewBox="0 0 30 30" w={5} h={5}>
    <path d="M0,0 v30 h10 v-30 z" fill="#009246" />
    <path d="M10,0 v30 h10 v-30 z" fill="#fff" />
    <path d="M20,0 v30 h10 v-30 z" fill="#ce2b37" />
  </Icon>
);

const UsIcon = () => (
  <Icon borderRadius="5px" viewBox="0 0 60 60" w={5} h={5}>
    <path d="M0,0 v60 h60 v-60 z" fill="#b22234" />
    <path
      d="M0,7.5h65m0,10H0m0,10H65m0,10H0m0,10H65m0,10H0 "
      stroke="#fff"
      strokeWidth="5"
    />
    <path d="M0,0 v35 h30 v-35 z" fill="#3c3b6e" />
  </Icon>
);

type LngPickerProps = {};

const LngPicker: FC<LngPickerProps> = () => {
  const { t } = useTranslation();
  const { setLanguage, language } = useContext(userPreferencesContext);
  var icon;
  var label;
  switch (language) {
    case Language.FR:
      icon = FrIcon;
      label = t(
        "FrTo",
        "You'r using french version. \nClick to change language"
      );
      break;
    case Language.ES:
      icon = EsIcon;
      label = t(
        "EsTo",
        "You'r using spanish version. \nClick to change language"
      );
      break;
    case Language.IT:
      icon = ItIcon;
      label = t(
        "ItTo",
        "You'r using italian version. \nClick to change language"
      );
      break;
    case Language.DE:
      icon = DeIcon;
      label = t(
        "DeTo",
        "You'r using german version. \nClick to change language"
      );
      break;
    case Language.US:
      icon = UsIcon;
      label = t(
        "UsTo",
        "You'r using american version. \nClick to change language"
      );
      break;
    default:
      icon = EnIcon;
      label = t(
        "EnTo",
        "You'r using engish version. \nClick to change language"
      );
  }

  return (
    <Menu>
      <Tooltip label={label} whiteSpace="pre-wrap">
        <MenuButton as={Button} size="sm" variant="ghost" px={1} isTruncated>
          <Icon as={icon} w={5} h={5} />
        </MenuButton>
      </Tooltip>

      <MenuList>
        <MenuItem
          display="none"
          icon={<UsIcon />}
          onClick={() => setLanguage(Language.US)}
        >
          American English
        </MenuItem>
        <MenuItem
          display="none"
          icon={<DeIcon />}
          onClick={() => setLanguage(Language.DE)}
        >
          Deutsch (German)
        </MenuItem>
        <MenuItem icon={<EnIcon />} onClick={() => setLanguage(Language.EN)}>
          English
        </MenuItem>
        <MenuItem
          display="none"
          icon={<EsIcon />}
          onClick={() => setLanguage(Language.ES)}
        >
          Español (Spanish)
        </MenuItem>
        <MenuItem icon={<FrIcon />} onClick={() => setLanguage(Language.FR)}>
          Français (French)
        </MenuItem>
        <MenuItem
          display="none"
          icon={<ItIcon />}
          onClick={() => setLanguage(Language.IT)}
        >
          Italiano (Italian)
        </MenuItem>

        {false && <MenuDivider />}
      </MenuList>
    </Menu>
  );
};

export default LngPicker;
