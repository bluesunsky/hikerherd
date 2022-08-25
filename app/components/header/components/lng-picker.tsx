import type { FC } from "react";

import { useContext } from "react";

import { Tooltip } from "@chakra-ui/tooltip";
import { useTranslation } from "react-i18next";
import { Heading, HStack } from "@chakra-ui/layout";
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
  <Icon viewBox="0 0 30 30" w={5} h={5}>
    <path d="M0,0 h30 v10 h-30 z" fill="#000" />
    <path d="M0,10 h30 v10 h-30 z" fill="#D00" />
    <path d="M0,20 h30 v10 h-30 z" fill="#FFCE00" />
  </Icon>
);

const EnIcon = () => (
  <Icon viewBox="0 0 60 60" w={5} h={5}>
    <path d="M0,0 v60 h60 v-60 z" fill="#012169" />
    <path d="M0,0 L60,60 M60,0 L0,60" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v60 M0,30 h60" stroke="#fff" strokeWidth="12" />
    <path d="M30,0 v60 M0,30 h60" stroke="#C8102E" strokeWidth="6" />
  </Icon>
);

const EsIcon = () => (
  <Icon viewBox="0 0 60 60" w={5} h={5}>
    <path d="M0,0 v60 h60 v-60 z" fill="#c60b1e" />
    <path d="M0,15 v30 h60 v-30 z" fill="#ffc400" />
  </Icon>
);

const FrIcon = () => (
  <Icon viewBox="0 0 30 30" w={5} h={5}>
    <path d="M0,0 v30 h10 v-30 z" fill="#ED2939" />
    <path d="M10,0 v30 h10 v-30 z" fill="#fff" />
    <path d="M20,0 v30 h10 v-30 z" fill="#002395" />
  </Icon>
);

const ItIcon = () => (
  <Icon viewBox="0 0 30 30" w={5} h={5}>
    <path d="M0,0 v30 h10 v-30 z" fill="#009246" />
    <path d="M10,0 v30 h10 v-30 z" fill="#fff" />
    <path d="M20,0 v30 h10 v-30 z" fill="#ce2b37" />
  </Icon>
);

const UsIcon = () => (
  <Icon viewBox="0 0 60 60" w={5} h={5}>
    <path d="M0,0 v60 h60 v-60 z" fill="#b22234" />
    <path
      d="M0,7.5h65m0,10H0m0,10H65m0,10H0m0,10H65m0,10H0 "
      stroke="#fff"
      strokeWidth="5"
    />
    <path d="M0,0 v35 h30 v-35 z" fill="#3c3b6e" />
  </Icon>
);

/*
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1235" height="650" viewBox="0 0 7410 3900">

<path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"/>
<rect width="2964" height="2100" fill="#3c3b6e"/>
<g fill="#fff">
<g id="s18">
<g id="s9">
<g id="s5">
<g id="s4">
<path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/>
<use xlink:href="#s" y="420"/>
<use xlink:href="#s" y="840"/>
<use xlink:href="#s" y="1260"/>
</g>
<use xlink:href="#s" y="1680"/>
</g>
<use xlink:href="#s4" x="247" y="210"/>
</g>
<use xlink:href="#s9" x="494"/>
</g>
<use xlink:href="#s18" x="988"/>
<use xlink:href="#s9" x="1976"/>
<use xlink:href="#s5" x="2470"/>
</g>
</svg>

*/

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
    <Tooltip label={label} whiteSpace="pre-wrap">
      <Menu>
        <MenuButton as={Button} size="sm" variant="ghost" px={1} isTruncated>
          <HStack>
            <Icon as={icon} w={5} h={5} />
            <Heading size="sm" isTruncated></Heading>
          </HStack>
        </MenuButton>

        <MenuList>
          <MenuItem
            icon={<UsIcon />}
            onClick={() => setLanguage(Language.US)}
            disabled
          >
            American
          </MenuItem>
          <MenuItem
            icon={<DeIcon />}
            onClick={() => setLanguage(Language.DE)}
            disabled
          >
            Deutsch (German)
          </MenuItem>
          <MenuItem icon={<EnIcon />} onClick={() => setLanguage(Language.EN)}>
            English
          </MenuItem>
          <MenuItem
            icon={<EsIcon />}
            onClick={() => setLanguage(Language.ES)}
            disabled
          >
            Español (Spanish)
          </MenuItem>
          <MenuItem icon={<FrIcon />} onClick={() => setLanguage(Language.FR)}>
            Français (French)
          </MenuItem>
          <MenuItem
            icon={<ItIcon />}
            onClick={() => setLanguage(Language.IT)}
            disabled
          >
            Italiano (Italian)
          </MenuItem>

          {false && <MenuDivider />}
        </MenuList>
      </Menu>
    </Tooltip>
  );
};

export default LngPicker;
