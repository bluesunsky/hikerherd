import type { BlitzPage } from "blitz";

import { Routes } from "blitz";
import { Fragment } from "react";

import { useTranslation } from "react-i18next";
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

import getCoverUrl from "../../users/helpers/get-cover-url";
import IndexCard from "../components/index-card";

const StartPage: BlitzPage = () => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const username = user
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "";
  var styles = {
    box: {
      backgroundImage: `url(${getCoverUrl(user, 1024)})`,
      backgroundSize: "cover",
      backgroundPositionY: "center",
      backgroundPositionX: "center",
    },
    text: {},
  };
  if (user && user.cover_id)
    styles.text = {
      color: "#fff",
      textShadow: "0 0 5px #000",
    };
  else
    styles.text = {
      textShadow: "0 0 5px #fff",
    };
  return (
    <PlainLayout>
      <Fragment>
        <Box bg={useColorModeValue("gray.50", "gray.800")} style={styles.box}>
          <Container
            as="main"
            maxW="container.sm"
            textAlign="center"
            py={{ base: 12, md: 20 }}
          >
            <Heading size="2xl" mb={2} style={styles.text}>
              {username}
            </Heading>
            <Text fontSize="xl" opacity="0.8" style={styles.text}>
              {t("WelcomeTo", "Welcome to {{appliname}}", {
                appliname: t("AppliName"),
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
              icon={FcRating}
              href={Routes.WishListPage()}
              title={t("WishList", "Wish list")}
              text={t("WishListDetail", "Track the gear you want to buy")}
            />

            <IndexCard
              icon={FcList}
              href={Routes.InventoryPage()}
              title={t("Inventory", "Inventory")}
              text={t("InventoryDetail", "Manage your backpacking gear")}
            />

            <IndexCard
              icon={FcTimeline}
              href={Routes.PacksPage()}
              title={t("Packs", "Packs")}
              text={t("PacksDetail", "Organize your gear into packs")}
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
                "GearSearchDetail",
                "Search the hikerherd database for gear"
              )}
            />

            <IndexCard
              icon={FcSearch}
              href={Routes.DiscoverPacksPage()}
              title={t("PackSearch", "Pack search")}
              text={t(
                "PackSearchDetail",
                "Look for packs created by other hikers"
              )}
            />
            <IndexCard
              icon={FcContacts}
              href={Routes.DiscoverUsersPage()}
              title={t("UserSearch", "User search")}
              text={t("UserSearchDetail", "Look for hiker")}
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
              icon={FcPortraitMode}
              href={Routes.ProfilePage({ username: user?.username || "" })}
              title={t("Profile", "My profile")}
              text={t("ProfileDetail", "View your own hikerherd profile page")}
            />

            <IndexCard
              icon={FcSettings}
              href={Routes.PreferencesPage()}
              title={t("Preferences", "My preferences")}
              text={t(
                "PreferencesDetail",
                "Set your preferred units and currency"
              )}
            />
          </SimpleGrid>
        </Container>
      </Fragment>
    </PlainLayout>
  );
};

StartPage.authenticate = { redirectTo: Routes.HomePage() };

export default StartPage;
