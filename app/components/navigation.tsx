import type { FC } from "react";
import type { RouteUrlObject } from "blitz";
import type { IconType } from "react-icons";

import { Link, Routes, useRouter } from "blitz";

import { useTranslation } from "react-i18next";
import { Stack, HStack, Text, Heading, Box } from "@chakra-ui/layout";
import {
  FcList,
  FcRating,
  FcTimeline,
  FcSearch,
  FcBinoculars,
  FcHome,
  FcContacts,
  FcPackage,
} from "react-icons/fc";
import { Icon } from "@chakra-ui/icon";
import { useColorModeValue } from "@chakra-ui/react";

type NavigationItemProps = {
  route: RouteUrlObject;
  icon: IconType;
};

const NavigationItem: FC<NavigationItemProps> = ({ children, icon, route }) => {
  const router = useRouter();
  const isActive = router.pathname === route.pathname;

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const activeBgColor = useColorModeValue("gray.50", "gray.900");
  const activeColor = useColorModeValue("blue.400", "cyan.400");

  return (
    <Link href={route} passHref>
      <HStack
        as="a"
        bg={isActive ? activeBgColor : "transparent"}
        _hover={{ bg: isActive ? activeBgColor : bgColor }}
        borderRadius="md"
        py={2}
        px={3}
      >
        <Icon as={icon} w={5} h={5} mr={1} />
        <Text color={isActive ? activeColor : ""} fontWeight="bold">
          {children}
        </Text>
      </HStack>
    </Link>
  );
};

const NavigationSection: FC<{ title: string }> = ({ title, children }) => {
  return (
    <Stack as="section" spacing={2}>
      <Heading
        fontSize="xs"
        pl={3}
        textTransform="uppercase"
        pb={2}
        color="gray.500"
      >
        {title}
      </Heading>

      {children}
    </Stack>
  );
};

const Navigation: FC = () => {
  const { t } = useTranslation();
  return (
    <Box as="aside">
      <Stack as="aside" spacing={8}>
        <NavigationSection title="Pack your pack">
          <NavigationItem route={Routes.HomePage()} icon={FcHome}>
            {t("Home", "Home")}
          </NavigationItem>
        </NavigationSection>

        <NavigationSection title={t("GearTools", "Gear tools")}>
          <NavigationItem route={Routes.WishListPage()} icon={FcRating}>
            {t("WishList", "Wish list")}
          </NavigationItem>
          <NavigationItem route={Routes.InventoryPage()} icon={FcList}>
            {t("Inventory", "Inventory")}
          </NavigationItem>
          <NavigationItem route={Routes.PacksPage()} icon={FcTimeline}>
            {t("Packs", "Packs")}
          </NavigationItem>
          <NavigationItem route={Routes.ArchivePage()} icon={FcPackage}>
            {t("Archive", "Archive")}
          </NavigationItem>
        </NavigationSection>

        <NavigationSection title={t("Discover", "Discover")}>
          <NavigationItem route={Routes.DiscoverGearPage()} icon={FcBinoculars}>
            {t("GearSearch", "Gear search")}
          </NavigationItem>
          <NavigationItem route={Routes.DiscoverPacksPage()} icon={FcSearch}>
            {t("PackSearch", "Pack search")}
          </NavigationItem>
          <NavigationItem route={Routes.DiscoverUsersPage()} icon={FcContacts}>
            {t("UserSearch", "User search")}
          </NavigationItem>
        </NavigationSection>

        <NavigationSection title={t("About", "About")}>
          <Text
            fontSize="sm"
            opacity="0.6"
            mt={3}
            py={-3}
            px={3}
            dangerouslySetInnerHTML={{
              __html: t(
                "AboutInformation1",
                "<strong>{{appliname}}</strong> (&copy; Benjamin Sérant) bring functional and gui changes to<br />\
<strong>Hikerherd</strong> \
(&copy; <a target='_blank' style='text-decoration:underline' href='https://github.com/benhoneywill/hikerherd/blob/main/LICENCE'>Ben Honeywill</a>), <br />\
a free and <a target='_blank' style='text-decoration:underline' href='https://github.com/benhoneywill/hikerherd'>open-source</a> website.",
                { appliname: t("AppliName") }
              ),
            }}
          ></Text>
          <Text
            fontSize="sm"
            opacity="0.6"
            mt={3}
            py={-3}
            px={3}
            dangerouslySetInnerHTML={{
              __html: t(
                "AboutInformation2",
                "<strong>{{appliname}}</strong> is also<br />\
a free and <a target='_blank' style='text-decoration:underline' href='https://github.com/bluesunsky/hikerherd'>open-source</a> website.",
                { appliname: t("AppliName") }
              ),
            }}
          ></Text>
        </NavigationSection>
      </Stack>
    </Box>
  );
};

export default Navigation;
