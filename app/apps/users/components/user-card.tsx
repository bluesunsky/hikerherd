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
              <LinkOverlay isTruncated>
                <Avatar size="xl" src={getAvatarUrl(user, 96)} />
                <Heading
                  size="md"
                  textAlign="center"
                  style={styles.username}
                  isTruncated
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

  /*(
    <LinkCard actions={actions} {...props}>
      <Stack align="center" spacing={5} py={1}>
        <Stack maxW="100%" px={0} align="center" spacing={2}>
          <HStack maxW="100%">
            {pack.private && <Icon as={FcLock} h={4} w={4} />}

            <Link href={route({ packId: pack.id })} passHref>
              <LinkOverlay isTruncated>
                <Heading size="md" isTruncated>
                  {pack.name}
                </Heading>
              </LinkOverlay>
            </Link>
          </HStack>

          {user && <UserTag size="sm" user={user} />}
        </Stack>

        <HStack marginTop="10px !important">
          <Tag size="sm">
            <TagLabel>
              {displayWeight(
                pack.totals.baseWeight + pack.totals.consumableWeight,
                weightUnit,
                true
              )}
            </TagLabel>
          </Tag>
          <Tag colorScheme="white" size="sm" padding="0px" minW="0px">
            <TagLabel> ( </TagLabel>
          </Tag>
          <Tooltip label="Poids du sac">
            <Tag colorScheme="teal" size="sm">
              <TagLeftIcon as={FaWeightHanging} />
              <TagLabel>
                {displayWeight(pack.totals.baseWeight, weightUnit, true)}
              </TagLabel>
            </Tag>
          </Tooltip>
          <Tag colorScheme="white" size="sm" padding="0px" minW="0px">
            <TagLabel> + </TagLabel>
          </Tag>
          <Tooltip label="Poids des consommables">
            <Tag colorScheme="pink" size="sm">
              <TagLeftIcon as={FaHamburger} />
              <TagLabel>
                {displayWeight(pack.totals.consumableWeight, weightUnit, true)}
              </TagLabel>
            </Tag>
          </Tooltip>

          <Tag colorScheme="white" size="sm" padding="0px" minW="0px">
            <TagLabel> )</TagLabel>
          </Tag>
        </HStack>
        <HStack marginTop="10px !important">
          <Tooltip label="Poids sur soi">
            <Tag colorScheme="blue" size="sm">
              <TagLeftIcon as={FaTshirt} />
              <TagLabel>
                {displayWeight(pack.totals.wornWeight, weightUnit, true)}
              </TagLabel>
            </Tag>
          </Tooltip>
        </HStack>
      </Stack>
    </LinkCard>
  );
  */
};

export default UserCard;
