import type { BlitzPage } from "blitz";

import { Routes } from "blitz";
import { Fragment } from "react";

import { t } from "i18next";
import { SimpleGrid, Container, Heading, Box, Text } from "@chakra-ui/layout";
import {
  FcBinoculars,
  FcPortraitMode,
  FcList,
  FcRating,
  FcSearch,
  FcSettings,
  FcTimeline,
  FcContacts,
} from "react-icons/fc";
import { useColorModeValue } from "@chakra-ui/react";

import PlainLayout from "app/layouts/plain-layout";
import useCurrentUser from "app/apps/users/hooks/use-current-user";

import IndexCard from "../components/index-card";

const StartPage: BlitzPage = () => {
  const user = useCurrentUser();
  const username = user
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "";
  return (
    <Fragment>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container
          as="main"
          maxW="container.sm"
          textAlign="center"
          py={{ base: 12, md: 20 }}
        >
          <Heading size="2xl" mb={2}>
            {username}
          </Heading>
          <Text fontSize="xl" opacity="0.8">
            {t("WelcomeTo", "Welcome to {{appliname}}", {
              appliname: t("AppliName", "Pack your pack"),
            })}
          </Text>
        </Container>
      </Box>

      <Container as="main" maxW="container.lg" py={{ base: 12, md: 20 }}>
        <Heading
          fontSize="sm"
          color="gray.500"
          textTransform="uppercase"
          mb={4}
        >
          {t("GearTools", "Gear tools")}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <IndexCard
            icon={FcList}
            href={Routes.InventoryPage()}
            title={t("Inventory", "Inventory")}
            text={t("InventoryDescription", "Manage your backpacking gear")}
          />

          <IndexCard
            icon={FcRating}
            href={Routes.WishListPage()}
            title={t("WishList", "Wish list")}
            text={t("WishListDescription", "Track the gear you want to buy")}
          />

          <IndexCard
            icon={FcTimeline}
            href={Routes.PacksPage()}
            title={t("Packs", "Packs")}
            text={t("PacksDescription", "Organize your gear into packs")}
          />
        </SimpleGrid>

        <Heading
          fontSize="sm"
          color="gray.500"
          textTransform="uppercase"
          mb={4}
          mt={8}
        >
          {t("Discover", "Discover")}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <IndexCard
            icon={FcBinoculars}
            href={Routes.DiscoverGearPage()}
            title={t("GearSearch", "Gear search")}
            text={t(
              "GearSearchDescription",
              "Search the hikerherd database for gear"
            )}
          />

          <IndexCard
            icon={FcSearch}
            href={Routes.DiscoverPacksPage()}
            title={t("PackSearch", "Pack search")}
            text={t(
              "PackSearchDescription",
              "Look for packs created by other hikers"
            )}
          />
          <IndexCard
            icon={FcContacts}
            href={Routes.DiscoverUsersPage()}
            title={t("UserSearch", "User search")}
            text={t("UserSearchDescription", "Look for hiker")}
          />
        </SimpleGrid>

        <Heading
          fontSize="sm"
          color="gray.500"
          textTransform="uppercase"
          mb={4}
          mt={8}
        >
          {t("Settings", "Settings")}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <IndexCard
            icon={FcSettings}
            href={Routes.PreferencesPage()}
            title={t("Preferences", "Your preferences")}
            text={t(
              "PreferencesDescription",
              "Set your preferred units and currency"
            )}
          />

          <IndexCard
            icon={FcPortraitMode}
            href={Routes.ProfilePage({ username: user?.username || "" })}
            title={t("Profile", "Your profile")}
            text={t(
              "ProfileDescription",
              "View your own hikerherd profile page"
            )}
          />
        </SimpleGrid>
      </Container>
    </Fragment>
  );
};

StartPage.authenticate = { redirectTo: Routes.HomePage() };

StartPage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>;

export default StartPage;
