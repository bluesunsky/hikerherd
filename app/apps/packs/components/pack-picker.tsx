import type { FC } from "react";
import type { IconType } from "react-icons";

import { Link, Routes, useQuery } from "blitz";

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
import { FaChevronDown } from "react-icons/fa";
import { FcList, FcPackage, FcRating, FcTimeline } from "react-icons/fc";

import packsQuery from "../queries/packs-query";

type PackPickerProps = {
  icon: IconType;
  title: string;
};

const PackPicker: FC<PackPickerProps> = ({ icon, title }) => {
  const [packs] = useQuery(packsQuery, {}, { suspense: false });
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
      >
        <HStack>
          <Icon as={icon} w={5} h={5} />
          <Heading size="sm" noOfLines={1} display="unset">
            {title}
          </Heading>
        </HStack>
      </MenuButton>

      <MenuList>
        <Link href={Routes.WishListPage()} passHref>
          <MenuItem as="a" icon={<FcRating />}>
            {t("WishList", "Wish list")}
          </MenuItem>
        </Link>
        <Link href={Routes.InventoryPage()} passHref>
          <MenuItem as="a" icon={<FcList />}>
            {t("Inventory", "Inventory")}
          </MenuItem>
        </Link>

        {!!packs?.length && <MenuDivider />}

        {packs?.map((pack) => (
          <Link
            key={pack.id}
            href={Routes.PackPage({ packId: pack.id })}
            passHref
          >
            <MenuItem as="a" icon={<FcTimeline />}>
              {pack.name}
            </MenuItem>
          </Link>
        ))}
        <MenuDivider />
        <Link href={Routes.ArchivePage()} passHref>
          <MenuItem as="a" icon={<FcPackage />}>
            {t("Archive", "Archive")}
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default PackPicker;
