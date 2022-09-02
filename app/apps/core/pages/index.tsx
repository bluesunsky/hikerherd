import type { BlitzPage, RouteUrlObject } from "blitz";
import type { IconType } from "react-icons";
import type { FC } from "react";

import { useQuery, Link, Routes } from "blitz";
import { Fragment } from "react";

import { useTranslation } from "react-i18next";
import { Heading, Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";
import { Image } from "@chakra-ui/image";
import { useColorModeValue } from "@chakra-ui/react";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import {
  FcBinoculars,
  FcList,
  FcRating,
  FcPackage,
  FcSearch,
  FcTimeline,
  FcContacts,
} from "react-icons/fc";

import LogoIcon from "app/icons/logo";
import LogoIcon2 from "app/icons/logo2";
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
          <Button as="a" width="full" mt={5}>
            {actionText}
          </Button>
        </Link>
      )}
    </Box>
  );
};

const HomePage: BlitzPage = () => {
  const [userCount] = useQuery(userCountQuery, {}, { suspense: false });
  const { t } = useTranslation();
  return (
    <PlainLayout>
      <Fragment>
        <Box bg={useColorModeValue("gray.50", "gray.800")}>
          <Container
            as="main"
            maxW="container.sm"
            textAlign="center"
            py={{ base: 12, md: 20 }}
          >
            <Heading size="xl" mb={4} display="flex" justifyContent="center">
              <LogoIcon w={20} h={20} />
              <div>
                {t("AppliName")}
                <Text fontSize="lg" opacity="0.8" mt={2}>
                  {t("AppliSubName", "Lighten your pack with {{appliname}}", {
                    appliname: t("AppliName"),
                  })}
                </Text>
              </div>
              <LogoIcon2 w={20} h={20} />
            </Heading>
            <Text fontSize="lg" opacity="0.8">
              {t(
                "AppliDetail",
                "Join the other hikers, backpackers & minimalists who are already \
using {{appliname}} to manage their gear and plan their \
adventures.",
                { appliname: t("AppliName") }
              )}
            </Text>
            <Link href={Routes.SignupPage()} passHref>
              <Button
                ml={3}
                mr={3}
                mt={8}
                size="lg"
                as="a"
                rightIcon={<FaArrowRight />}
                colorScheme="blue"
              >
                {t("GetStarted", "Get started today")}
              </Button>
            </Link>
            <Link href={t("AppliExample")} passHref>
              <Button
                ml={3}
                mr={3}
                mt={8}
                size="lg"
                as="a"
                rightIcon={<RiLayoutGridFill />}
                colorScheme="gray"
              >
                {t("SeeExample", "See an example")}
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
            {t("HowDoesItWork", "How does it work?")}
          </Heading>
          <Text fontSize="lg" opacity="0.8">
            {t(
              "HowDoesItWorkDetail",
              "Organizing your gear closet and planning packing lists has never been so easy."
            )}
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={12}>
            <IconCard
              icon={FcRating}
              title={t("WishList", "Wish list")}
              text={t("WishListDetail", "Track the gear you want to buy")}
            />

            <IconCard
              icon={FcList}
              title={t("Inventory", "Inventory")}
              text={t("InventoryDetail", "Manage your backpacking gear")}
            />

            <IconCard
              icon={FcTimeline}
              title={t("Packs", "Packs")}
              text={t("PacksDetail", "Organize your gear into packs")}
            />

            <IconCard
              icon={FcPackage}
              title={t("Archive", "Archive")}
              text={t("ArchiveDetail", "Keep your old gear")}
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
                  {t("PackWeightAnalytics", "Pack weight analytics")}
                </Heading>
                <Text color="blue.300" fontWeight="bold" fontSize="lg" mb={2}>
                  {t(
                    "PackWeightAnalyticsDetail",
                    "You need to know where your weight is coming from."
                  )}
                </Text>
                <Text fontSize="lg" opacity="0.8">
                  {t(
                    "PackWeightAnalyticsDetailAddOn",
                    "The <strong>hikerherd</strong> analytics tools help you to see \
which items are weighing you down and what to leave at home."
                  )}
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
            {t("Discover", "Discover")}
          </Heading>
          <Text fontSize="lg" opacity="0.8" maxW="container.md" mx="auto">
            {t(
              "DiscoverDetail",
              "Need some inspiration? Search for packs and gear created by other users."
            )}
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={12}>
            <IconCard
              icon={FcBinoculars}
              title={t("GearSearch", "Gear search")}
              actionLink={Routes.DiscoverGearPage()}
              actionText={t("GearSearchAction", "Search for gear")}
              text={t(
                "GearSearchDetail",
                "Search the hikerherd database for gear"
              )}
            />

            <IconCard
              icon={FcSearch}
              title={t("PackSearch", "Pack search")}
              actionLink={Routes.DiscoverPacksPage()}
              actionText={t("PackSearchAction", "Search for pack")}
              text={t(
                "PackSearchDetail",
                "Look for packs created by other hikers"
              )}
            />
            <IconCard
              icon={FcContacts}
              title={t("UserSearch", "User search")}
              actionLink={Routes.DiscoverUsersPage()}
              actionText={t("UserSearchAction", "Search for user")}
              text={t("UserSearchDetail", "Look for hiker")}
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
              {t("ReadyToGetStarted", "Ready to get started?")}
            </Heading>
            <Text fontSize="lg" opacity="0.8">
              {t("JoinThe", "Join the")}{" "}
              <Tag my="2px" fontWeight="bold" colorScheme="teal">
                <TagLeftIcon boxSize="12px" as={FaUser} />
                <TagLabel>{userCount ? userCount : "…"}</TagLabel>
              </Tag>{" "}
              {t("OtherUserOf", "other hikers who are already using")}{" "}
              <strong>{t("AppliName")}</strong>{" "}
              {t(
                "ToManage",
                "to manage their gear and reduce their pack weight."
              )}
            </Text>

            <Link href={Routes.SignupPage()} passHref>
              <Button
                mt={8}
                size="lg"
                as="a"
                rightIcon={<FaArrowRight />}
                colorScheme="blue"
              >
                {t("SignupForFree", "Sign up for free")}
              </Button>
            </Link>
          </Container>
        </Box>
      </Fragment>
    </PlainLayout>
  );
};

HomePage.redirectAuthenticatedTo = Routes.StartPage();

export default HomePage;
