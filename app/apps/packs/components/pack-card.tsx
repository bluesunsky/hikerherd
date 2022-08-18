import type { FC } from "react";
import type { Pack } from "db";
import type { BoxProps } from "@chakra-ui/layout";

import { useContext } from "react";
import { Link, Routes } from "blitz";

import { format } from "date-fns";
import { useColorModeValue } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { Heading, HStack, Stack, LinkOverlay } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { FcLock } from "react-icons/fc";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import {
  FaHamburger,
  FaTshirt,
  FaWeightHanging,
  FaCalendarAlt,
} from "react-icons/fa";

import displayWeight from "app/helpers/display-weight";
import LinkCard from "app/components/link-card";
import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import UserTag from "app/components/user-tag";

type PackTotals = {
  consumableWeight: number;
  wornWeight: number;
  baseWeight: number;
};

type PackCardProps = {
  pack: Pick<Pack, "id" | "name" | "private" | "updatedAt"> & {
    totals: PackTotals;
  };
  user?: {
    username: string;
    avatar_id: string | null;
    avatar_version: number | null;
  };
  actions?: JSX.Element;
  shareLink?: boolean;
};

const PackCard: FC<PackCardProps & BoxProps> = ({
  pack,
  actions,
  shareLink,
  user,
  ...props
}) => {
  const { weightUnit } = useContext(userPreferencesContext);

  const route = shareLink ? Routes.PackSharePage : Routes.PackPage;
  const updateBgColor = useColorModeValue(
    "rgba(0,0,0,0.05)",
    "rgba(255,255,255,0.05)"
  );
  return (
    <LinkCard actions={actions} {...props} p={2}>
      <Stack align="center" spacing={5} py={1} height="100%">
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
        </Stack>

        <HStack marginTop="10px !important">
          <Tag size="sm">
            <TagLabel>
              {displayWeight(
                pack.totals.baseWeight + pack.totals.consumableWeight,
                weightUnit,
                true,
                1
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
                {displayWeight(pack.totals.baseWeight, weightUnit, true, 1)}
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
                {displayWeight(
                  pack.totals.consumableWeight,
                  weightUnit,
                  true,
                  1
                )}
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
                {displayWeight(pack.totals.wornWeight, weightUnit, true, 1)}
              </TagLabel>
            </Tag>
          </Tooltip>
        </HStack>

        <HStack justifyContent="space-between" mt={2} width="100%">
          <Tooltip label="Mise à jour">
            <Tag size="sm" borderRadius="full" bg={updateBgColor}>
              <Icon as={FaCalendarAlt} />
              &nbsp;
              {format(pack.updatedAt, "dd/MM/yyyy")}
            </Tag>
          </Tooltip>
          {user && <UserTag size="sm" user={user} />}
        </HStack>
      </Stack>
    </LinkCard>
  );
};

export default PackCard;
