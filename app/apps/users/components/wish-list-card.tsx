import type { FC } from "react";
import type { User } from "db";
import type { BoxProps } from "@chakra-ui/layout";

import { Link, Routes } from "blitz";

import { useTranslation } from "react-i18next";
import { Center, Heading, HStack, Stack, LinkOverlay } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { FcRating } from "react-icons/fc";

import LinkCard from "app/components/link-card";

type InventoryCardProps = {
  user: Pick<User, "username">;
};

const WishListCard: FC<InventoryCardProps & BoxProps> = ({
  user,
  ...props
}) => {
  const route = Routes.WishListSharePage;
  const { t } = useTranslation();
  var typename = t("UsersList", "{{username}}'s {{title}}", {
    username: user
      ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
      : "",
    title: t("WishList", "Wish list").toLowerCase(),
  });
  typename = typename.charAt(0).toUpperCase() + typename.slice(1);
  return (
    <LinkCard
      {...props}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack align="center" spacing={5} py={1}>
        <Stack maxW="100%" px={0} align="center" spacing={2}>
          <HStack maxW="100%">
            <Link href={route({ username: user.username })} passHref>
              <LinkOverlay isTruncated>
                <Center>
                  <Icon as={FcRating} w={8} h={8} mb={2} />
                </Center>
                <Heading
                  size="md"
                  textAlign="center"
                  textShadow="0 0 5px #fff"
                  isTruncated
                >
                  {typename}
                </Heading>
              </LinkOverlay>
            </Link>
          </HStack>
        </Stack>
      </Stack>
    </LinkCard>
  );
};

export default WishListCard;
