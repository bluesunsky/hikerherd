import type { BlitzPage } from "blitz";

import { Fragment } from "react";

import { Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

import SidebarLayout from "app/layouts/sidebar-layout";
import Card from "app/components/card";

import GlobalUsersSearch from "../../components/global-users-search";
// <QuantityPicker
const DiscoverUsersPage: BlitzPage = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Fragment>
      <Heading mb={4} size="md">
        Utilisateurs
      </Heading>

      <Text mb={5} color={textColor}>
        Rechercher les utilisateurs de Pack your pack.
      </Text>

      <Card>
        <GlobalUsersSearch />
      </Card>
    </Fragment>
  );
};

DiscoverUsersPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DiscoverUsersPage;
