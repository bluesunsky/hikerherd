import type { BlitzPage } from "blitz";

import { Routes } from "blitz";
import { Fragment } from "react";

import { SimpleGrid, Container, Heading, Box, Text } from "@chakra-ui/layout";
import {
  FcBinoculars,
  FcPortraitMode,
  FcList,
  FcRating,
  FcSearch,
  FcSettings,
  FcTimeline,
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
            Bienvenue dans Pack&nbsp;your&nbsp;pack
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
          Organiser
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <IndexCard
            icon={FcList}
            href={Routes.InventoryPage()}
            title="Inventaire"
            text="Gérer les équipements que vous possédez"
          />

          <IndexCard
            icon={FcRating}
            href={Routes.WishListPage()}
            title="Souhaits"
            text="Suiver les équipements que vous voulez acheter"
          />

          <IndexCard
            icon={FcTimeline}
            href={Routes.PacksPage()}
            title="Packs"
            text="Organiser vos équipements dans des packs"
          />
        </SimpleGrid>

        <Heading
          fontSize="sm"
          color="gray.500"
          textTransform="uppercase"
          mb={4}
          mt={8}
        >
          Découvrir
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <IndexCard
            icon={FcBinoculars}
            href={Routes.DiscoverGearPage()}
            title="Equipements partagés"
            text="Rechercher un équipement parmis ceux des autres utilisateurs"
          />

          <IndexCard
            icon={FcSearch}
            href={Routes.DiscoverPacksPage()}
            title="Packs partagés"
            text="Rechercher un pack parmis ceux des autres utilisateurs"
          />
        </SimpleGrid>

        <Heading
          fontSize="sm"
          color="gray.500"
          textTransform="uppercase"
          mb={4}
          mt={8}
        >
          Configurer
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <IndexCard
            icon={FcSettings}
            href={Routes.PreferencesPage()}
            title="Mes préférences"
            text="Définiser votre unité et votre monnaie"
          />

          <IndexCard
            icon={FcPortraitMode}
            href={Routes.ProfilePage({ username: user?.username || "" })}
            title="Votre profil"
            text="Consulter votre profil"
          />
        </SimpleGrid>
      </Container>
    </Fragment>
  );
};

StartPage.authenticate = { redirectTo: Routes.HomePage() };

StartPage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>;

export default StartPage;
