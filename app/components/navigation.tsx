import type { FC } from "react";
import type { RouteUrlObject } from "blitz";
import type { IconType } from "react-icons";

import { Link, Routes, useRouter } from "blitz";

import {
  Stack,
  HStack,
  Text,
  Heading,
  Box,
  Link as Anchor,
} from "@chakra-ui/layout";
import {
  FcList,
  FcRating,
  FcTimeline,
  FcSearch,
  FcBinoculars,
  FcHome,
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
  return (
    <Box as="aside">
      <Stack as="aside" spacing={8}>
        <NavigationSection title="Pack your pack">
          <NavigationItem route={Routes.HomePage()} icon={FcHome}>
            Home
          </NavigationItem>
        </NavigationSection>

        <NavigationSection title="Gear tools">
          <NavigationItem route={Routes.InventoryPage()} icon={FcList}>
            Inventory
          </NavigationItem>
          <NavigationItem route={Routes.WishListPage()} icon={FcRating}>
            Wish list
          </NavigationItem>
          <NavigationItem route={Routes.PacksPage()} icon={FcTimeline}>
            Packs
          </NavigationItem>
        </NavigationSection>

        <NavigationSection title="Discover">
          <NavigationItem route={Routes.DiscoverGearPage()} icon={FcBinoculars}>
            Gear search
          </NavigationItem>
          <NavigationItem route={Routes.DiscoverPacksPage()} icon={FcSearch}>
            Pack search
          </NavigationItem>
        </NavigationSection>

        <NavigationSection title="A propos">
          <Text fontSize="sm" opacity="0.6" mt={3} py={-3} px={3}>
            <strong>Pack your pack</strong> is a fork of
            <br />
            <strong>Hikerherd</strong>{" "}
            <Anchor
              isExternal
              href="https://github.com/benhoneywill/hikerherd/blob/main/LICENCE"
            >
              &copy; Ben Honeywill
            </Anchor>
            . <br></br>A free et{" "}
            <Anchor
              textDecoration="underline"
              isExternal
              href="https://github.com/benhoneywill/hikerherd"
            >
              open-source
            </Anchor>{" "}
            website.
          </Text>
        </NavigationSection>
      </Stack>
    </Box>
  );
};

export default Navigation;
