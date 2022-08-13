import type { BlitzPage, RouteUrlObject } from "blitz";
import type { IconType } from "react-icons";
import type { FC } from "react";

import { useQuery, Link, Routes } from "blitz";
import { Fragment } from "react";

import { Heading, Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";
import { Image } from "@chakra-ui/image";
import { useColorModeValue } from "@chakra-ui/react";
import { FaUser, FaArrowRight } from "react-icons/fa";
import {
  FcBinoculars,
  FcList,
  FcRating,
  FcSearch,
  FcTimeline,
} from "react-icons/fc";

import PlainLayout from "app/layouts/plain-layout";

import userCountQuery from "../queries/user-count-query";

type IconCardProps = {
  icon: IconType;
  title: string;
  text: string | JSX.Element;
  actionLink?: RouteUrlObject;
  actionText?: string;
};

const IconCard: FC<IconCardProps> = ({
  icon,
  title,
  text,
  actionLink,
  actionText,
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p={5}
      borderRadius="md"
      textAlign="center"
    >
      <Icon as={icon} w={8} h={8} mb={2} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text opacity="0.8">{text}</Text>

      {actionLink && actionText && (
        <Link href={actionLink} passHref>
          <Button isFullWidth as="a" mt={5}>
            {actionText}
          </Button>
        </Link>
      )}
    </Box>
  );
};

const HomePage: BlitzPage = () => {
  const [userCount] = useQuery(userCountQuery, {}, { suspense: false });

  return (
    <Fragment>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container
          as="main"
          maxW="container.sm"
          textAlign="center"
          py={{ base: 12, md: 20 }}
        >
          <Heading size="xl" mb={4}>
            Alléger votre sac
          </Heading>
          <Text fontSize="lg" opacity="0.8">
            Rejoignez les autres randonneurs, routards et minimalistes qui
            utilisent déjà <strong>Pack&nbsp;your&nbsp;pack</strong> pour gérer
            leurs équipements et planifier leurs aventures.
          </Text>
          <Link href={Routes.SignupPage()} passHref>
            <Button
              mt={8}
              size="lg"
              as="a"
              rightIcon={<FaArrowRight />}
              colorScheme="blue"
            >
              S&lsquo;enregistrer
            </Button>
          </Link>
        </Container>
      </Box>

      <Container
        as="main"
        maxW="container.lg"
        pb={{ base: 16, md: 24 }}
        pt={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <Heading size="lg" mb={4}>
          Comment ça marche ?
        </Heading>
        <Text fontSize="lg" opacity="0.8">
          Consignez vos équipements puis organiser les dans des packs.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={12}>
          <IconCard
            icon={FcList}
            title="Constituez votre inventaire"
            text="Gérez tous vos équipements qui pourraient vous être utile."
          />

          <IconCard
            icon={FcRating}
            title="Etablissez vos souhaits"
            text="Identifiez ce que vous voulez acheter pour améliorer votre sac."
          />

          <IconCard
            icon={FcTimeline}
            title="Organisez vos Packs"
            text="Faites des configurations de sacs pour optimiser vos expéditions."
          />
        </SimpleGrid>
      </Container>

      <Box bg="gray.700" color="white">
        <Container
          as="main"
          maxW="container.lg"
          py={16}
          textAlign={{ base: "center", lg: "left" }}
        >
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={8}
            alignItems="center"
          >
            <Box>
              <Heading size="lg" mb={4}>
                Analyse du poids
              </Heading>
              <Text color="blue.300" fontWeight="bold" fontSize="lg" mb={2}>
                Vous pouvez identifier rapidement les équipements les plus
                lourds.
              </Text>
              <Text fontSize="lg" opacity="0.8">
                Avec la vue graphique, vous voyez rapidement l&lsquo;impact
                d&lsquo;un type d&lsquo;équipement ou d&lsquo;un équipement afin
                de juger s&lsquo;il convient ou nom de le prendre avec vous.
              </Text>
            </Box>

            <Box>
              <Image
                mx="auto"
                alt="Screenshot of piechart and table"
                borderRadius="md"
                w="100%"
                src="/pack-analytics.png"
                boxShadow="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Container
        as="main"
        maxW="container.lg"
        py={{ base: 16, md: 24 }}
        textAlign="center"
      >
        <Heading size="lg" mb={4}>
          Découvrir
        </Heading>
        <Text fontSize="lg" opacity="0.8" maxW="container.md" mx="auto">
          Besoin d&lsquo;inspiration ? Vous pouvez rechercher parmis les
          équipements d&lsquo;autres utilisateurs.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={12}>
          <IconCard
            icon={FcBinoculars}
            title="Equipements partagés"
            actionLink={Routes.DiscoverGearPage()}
            actionText="Chercher un équipement"
            text="Rechercher un équipement parmis ceux des autres utilisateurs"
          />

          <IconCard
            icon={FcSearch}
            title="Packs partagées"
            actionLink={Routes.DiscoverPacksPage()}
            actionText="Chercher un pack"
            text="Rechercher un pack parmis ceux des autres utilisateurs"
          />
        </SimpleGrid>
      </Container>

      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container
          as="main"
          maxW="container.sm"
          py={{ base: 16, md: 24 }}
          textAlign="center"
        >
          <Heading size="lg" mb={4}>
            Prêt à commencer ?
          </Heading>
          <Text fontSize="lg" opacity="0.8">
            Rejoindre les{" "}
            <Tag my="2px" fontWeight="bold" colorScheme="teal">
              <TagLeftIcon boxSize="12px" as={FaUser} />
              <TagLabel>{userCount ? userCount : "..."}</TagLabel>
            </Tag>{" "}
            autres utilisateurs qui utilisent déjà l&lsquo;application.
          </Text>

          <Link href={Routes.SignupPage()} passHref>
            <Button
              mt={8}
              size="lg"
              as="a"
              rightIcon={<FaArrowRight />}
              colorScheme="blue"
            >
              S&lsquo;enregistrer gratuitement
            </Button>
          </Link>
        </Container>
      </Box>
    </Fragment>
  );
};

HomePage.redirectAuthenticatedTo = Routes.StartPage();

HomePage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>;

export default HomePage;
