import type { FC } from "react";

import { useMutation } from "blitz";
import { useContext } from "react";

import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Avatar } from "@chakra-ui/avatar";
import { Icon } from "@chakra-ui/icon";
import { FaImage, FaCheckCircle, FaCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { IconButton } from "@chakra-ui/button";
//import { useColorModeValue } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { t } from "i18next";

import gearOrganizerContext from "app/apps/inventory/contexts/gear-organizer-context";
import Popover from "app/components/popover";
import togglePackGearReadyMutation from "app/apps/pack-gear/mutations/toggle-pack-gear-ready-mutation";

type GearCardHeaderProps = {
  menu?: JSX.Element | null;
  id?: string;
  name: string;
  manufacturer: string | null;
  kind: string | null;
  ready?: boolean;
  imageUrl?: string | null;
  onHeadingClick?: () => void;
};

const GearCardHeader: FC<GearCardHeaderProps> = ({
  menu,
  id,
  name,
  manufacturer,
  kind,
  ready,
  imageUrl,
  onHeadingClick,
}) => {
  //const avatarColor = useColorModeValue("gray.200", "gray.600");

  const { refetch } = useContext(gearOrganizerContext);
  let readyImage = ready ? FaCheckCircle : FaCircle;
  let readyLabel = ready ? t("Ready", "Ready") : t("Unready", "Unready");
  const [toggleReady] = useMutation(togglePackGearReadyMutation);
  return (
    <HStack justify="space-between" p={2} pb={0}>
      <HStack width={menu ? "calc(100% - 35px)" : "100%"}>
        <Popover
          maxH="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          hideContent={!imageUrl}
          background="white"
          p="1px"
          overflow="hidden"
          trigger={
            <Avatar
              src={imageUrl || ""}
              size="xl"
              borderRadius="5px"
              icon={<Icon as={FaImage} />}
              bg="transparent"
            />
          }
        >
          <Image
            maxW="100%"
            display="inline-block"
            src={imageUrl || ""}
            alt={name}
            background="white"
          />
        </Popover>

        <Heading
          size="xs"
          noOfLines={4}
          cursor={onHeadingClick ? "pointer" : "inherit"}
          onClick={onHeadingClick}
        >
          <Text>{kind}</Text>
          {name}
          <Text fontWeight="normal">{manufacturer}</Text>
        </Heading>
      </HStack>

      {menu && (
        <VStack>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              borderRadius="full"
              icon={<BsThreeDotsVertical />}
              size="xs"
              aria-label="actions"
            />
            <Portal>{menu}</Portal>
          </Menu>
          {ready !== undefined && id && (
            <Tooltip label={readyLabel}>
              <IconButton
                borderRadius="full"
                size="xs"
                onClick={async () => {
                  await toggleReady({ id: id });
                  refetch();
                }}
                icon={
                  <Icon
                    as={readyImage}
                    w={5}
                    h={5}
                    color={ready ? "blue.500" : "gray.100"}
                  />
                }
                aria-label={""}
              />
            </Tooltip>
          )}
        </VStack>
      )}
    </HStack>
  );
};

export default GearCardHeader;
