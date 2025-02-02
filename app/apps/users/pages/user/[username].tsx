import type { BlitzPage, GetServerSideProps } from "blitz";

import { useQuery, useRouter, NotFoundError } from "blitz";
import { Fragment } from "react";

import { useTranslation } from "react-i18next";
import {
  Container,
  Box,
  Heading,
  Stack,
  SimpleGrid,
  Center,
  Text,
} from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/react";

import PrefetchQueryClient from "app/helpers/prefetch-query-client";
import PlainLayout from "app/layouts/plain-layout";
import PackCard from "app/apps/packs/components/pack-card";
import Seo from "app/components/seo";

import userQuery from "../../queries/user-query";
import useCurrentUser from "../../hooks/use-current-user";
import AvatarUploader from "../../components/avatar-uploader";
import CoverUploader from "../../components/cover-uploader";
import InventoryCard from "../../components/inventory-card";
import WishListCard from "../../components/wish-list-card";
import getAvatarUrl from "../../helpers/get-avatar-url";
import getCoverUrl from "../../helpers/get-cover-url";

const ProfilePage: BlitzPage = () => {
  const router = useRouter();
  const currentUser = useCurrentUser({ suspense: false });
  const { t } = useTranslation();
  const [user] = useQuery(userQuery, {
    username: router.query.username as string,
  });

  const emptyBg = useColorModeValue("gray.200", "gray.700");
  const username = user
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "";
  const styles = {
    box: {
      backgroundImage: `url(${getCoverUrl(user, 1024)})`,
      backgroundSize: "cover",
      backgroundPositionY: "center",
      backgroundPositionX: "center",
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
    },
    username: {},
  };
  if (user.cover_id)
    styles.username = {
      color: "#fff",
      textShadow: "0 0 5px #000",
    };
  else
    styles.username = {
      textShadow: "0 0 5px #fff",
    };
  return (
    <PlainLayout>
      <Fragment>
        <Seo
          title={user.username}
          description={t(
            "UserInformation",
            "{{username}} is on {{appliname}}. Check out their gear lists and then use the gear tools to create your own.",
            { username: user.username, appliname: t("AppliName") }
          )}
        />

        <Box bg={useColorModeValue("gray.50", "gray.800")} style={styles.box}>
          <Container as="main" maxW="container.lg" py={{ base: 12, md: 20 }}>
            <Stack align="center" spacing={4}>
              <Avatar size="2xl" src={getAvatarUrl(user, 300)} />
              <Heading size="xl" style={styles.username}>
                {username}
              </Heading>
              {user.id === currentUser?.id && (
                <>
                  <Container style={styles.buttons}>
                    <AvatarUploader />
                    <Box mx={3}></Box>
                    <CoverUploader />
                  </Container>
                </>
              )}
            </Stack>
          </Container>
        </Box>

        <Container as="main" maxW="container.lg" py={{ base: 4, lg: 12 }}>
          {!!user.packs.length && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={2}>
              <InventoryCard user={user} />
              <WishListCard user={user} />
              {user.packs.map((pack) => (
                <PackCard key={pack.id} pack={pack} shareLink />
              ))}
            </SimpleGrid>
          )}

          {!user.packs.length && (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={4}
                mt={2}
              >
                <InventoryCard user={user} />
                <WishListCard user={user} />
                <Center p={6} borderRadius="md" bg={emptyBg}>
                  <Text size="md" opacity="0.4" textAlign="center">
                    {t(
                      "UserNoPack",
                      "{{username}} has not made any packs yet",
                      { username: user.username }
                    )}
                  </Text>
                </Center>
              </SimpleGrid>
            </>
          )}
        </Container>
      </Fragment>
    </PlainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = new PrefetchQueryClient(ctx);

  try {
    const username = ctx.params?.username as string;
    await client.prefetchQuery(userQuery, { username });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { notFound: true };
    } else {
      throw error;
    }
  }

  return {
    props: {
      dehydratedState: client.dehydrate(),
    },
  };
};

export default ProfilePage;
