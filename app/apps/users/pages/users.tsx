import type { BlitzPage } from "blitz";

import { Routes, useQuery } from "blitz";
import { Fragment } from "react";

import { Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

import SidebarLayout from "app/layouts/sidebar-layout";

import usersQuery from "../queries/users-query";
import UserCard from "../components/user-card";

const UsersPage: BlitzPage = () => {
  const emptyBg = useColorModeValue("gray.200", "gray.700");

  const [users] = useQuery(usersQuery, {});

  return (
    <Fragment>
      <Heading size="md" mb={6}>
        Utilisateurs
      </Heading>

      {users.length === 0 && (
        <Stack align="center" p={6} borderRadius="md" spacing={6} bg={emptyBg}>
          <Text size="md" opacity="0.4">
            Il n&lsquo;a pas encore d&lsquo;utilisateur.
          </Text>
        </Stack>
      )}

      {users.length > 0 && (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mt={2}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </SimpleGrid>
      )}
    </Fragment>
  );
};

UsersPage.authenticate = { redirectTo: Routes.LoginPage() };
UsersPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

UsersPage.redirectAuthenticatedTo = ({ session }) => {
  if (session.role !== "ADMIN") return Routes.HomePage();
  return "";
};

export default UsersPage;
