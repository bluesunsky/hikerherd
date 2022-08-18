import type { FC } from "react";
import type { Currency } from "db";

import { Box, Wrap, Flex } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

import GearCardHeader from "./gear-card-header";
import GearCardValues from "./gear-card-values";
import GearCardTags from "./gear-card-tags";

type GearCardProps = {
  name: string;
  weight: number;
  imageUrl?: string | null;
  price?: number | null;
  currency?: Currency;
  worn?: boolean;
  consumable?: boolean;
  replaceable?: boolean;
  link?: string | null;
  notes?: string | null;
  kind?: string | null;
  quantity?: number;
  onHeadingClick?: () => void;
  menu?: JSX.Element | null;
  dragging?: boolean;
  purchaseDate?: Date | null;
};

const GearCard: FC<GearCardProps> = ({
  name,
  imageUrl,
  onHeadingClick,
  weight,
  price,
  currency,
  quantity,
  worn,
  consumable,
  replaceable,
  link,
  notes,
  kind,
  menu = null,
  dragging = false,
  children,
  purchaseDate,
}) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.100", "gray.900");
  const inner = useColorModeValue("gray.50", "gray.700");

  return (
    <Flex
      direction="column"
      borderRadius="md"
      position="relative"
      border="2px solid"
      bg={bg}
      borderColor={dragging ? "blue.400" : border}
    >
      <GearCardHeader
        menu={menu}
        name={name}
        imageUrl={imageUrl}
        onHeadingClick={onHeadingClick}
      />

      <Wrap
        spacing={2}
        p={2}
        m={2}
        borderRadius="md"
        border="1px solid"
        borderColor={border}
        flexGrow={1}
        bg={inner}
      >
        <GearCardValues
          weight={weight}
          price={price}
          currency={currency}
          quantity={quantity}
          worn={worn}
          purchaseDate={purchaseDate}
        />
        <GearCardTags
          consumable={consumable}
          replaceable={replaceable}
          link={link}
          notes={notes}
          kind={kind}
        />
      </Wrap>

      {children && (
        <Box p={2} pt={0} mt="auto">
          {children}
        </Box>
      )}
    </Flex>
  );
};

export default GearCard;
