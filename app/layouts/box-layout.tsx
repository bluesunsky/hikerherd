import type { BlitzLayout } from "blitz";

import { Routes, Link } from "blitz";
import { Fragment } from "react";

import { useTranslation } from "react-i18next";
import { useColorModeValue } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Flex, Box, Heading, Text, Stack } from "@chakra-ui/layout";

import Header from "app/components/header/components/header";

import Seo from "../components/seo";

type BoxLayoutProps = {
  title: string;
  description: string;
};

const BoxLayout: BlitzLayout<BoxLayoutProps> = ({
  title,
  description,
  children,
}) => {
  const background = useColorModeValue("gray.100", "gray.900");
  const boxBackground = useColorModeValue("white", "gray.700");
  const { t } = useTranslation();
  return (
    <Fragment>
      <Seo title={title} description={description} />
      <Header />

      <Flex
        w="100%"
        minH="calc(100vh - 60px)"
        align="center"
        justify="center"
        direction="column"
        bg={background}
      >
        <Box
          as="main"
          w={{ base: "100%", md: "500px" }}
          minH={{ base: "100vh", md: "auto" }}
          my={{ base: "0", md: 12 }}
          p={10}
          maxW="100%"
          position="relative"
          bg={boxBackground}
          borderRadius={{ base: 0, md: "xl" }}
          textAlign="center"
        >
          <Box as="header" mb={8}>
            <Heading mb={3}>{title}</Heading>
            <Text fontSize="lg" color="gray.400">
              {description}
            </Text>
          </Box>

          <Stack spacing={4}>
            {children}

            <Link href={Routes.HomePage()} passHref>
              <Button as="a" size="lg" width="full">
                {t("GoBackHome", "Go back home")}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default BoxLayout;
