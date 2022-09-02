import type { FC } from "react";
import type { User } from "db";
import type { BoxProps } from "@chakra-ui/layout";

import { Link, Routes } from "blitz";

import { Heading, HStack, Stack, LinkOverlay } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";

import LinkCard from "app/components/link-card";

import getAvatarUrl from "../helpers/get-avatar-url";
import getCoverUrl from "../helpers/get-cover-url";
type UserTotals = {
  nbPacks: number;
  nbGears: number;
  nbWishs: number;
};

type UserCardProps = {
  user: Pick<
    User,
    | "id"
    | "username"
    | "avatar_id"
    | "avatar_version"
    | "cover_id"
    | "cover_version"
  > & {
    totals: UserTotals;
  };
};

const UserCard: FC<UserCardProps & BoxProps> = ({ user, ...props }) => {
  //const { weightUnit } = useContext(userPreferencesContext);

  const route = Routes.ProfilePage;
  var styles = {
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
  const username = user
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "";
  return (
    <LinkCard {...props} style={styles.box}>
      <Stack align="center" spacing={5} py={1}>
        <Stack maxW="100%" px={0} align="center" spacing={2}>
          <HStack maxW="100%">
            <Link href={route({ username: user.username })} passHref>
              <LinkOverlay noOfLines={1}>
                <Avatar size="xl" src={getAvatarUrl(user, 96)} />
                <Heading
                  size="md"
                  textAlign="center"
                  style={styles.username}
                  noOfLines={1}
                >
                  {username}
                </Heading>
              </LinkOverlay>
            </Link>
          </HStack>
        </Stack>
      </Stack>
    </LinkCard>
  );
};

export default UserCard;
