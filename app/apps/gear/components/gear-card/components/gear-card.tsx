import type { FC } from "react";
import type { Currency } from "db";

import { Box, Wrap, Flex } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

import GearCardHeader from "./gear-card-header";
import GearCardValues from "./gear-card-values";
import GearCardTags from "./gear-card-tags";

type GearCardProps = {
  name: string;
  manufacturer: string | null;
  kind: string | null;
  weight: number;
  imageUrl?: string | null;
  price?: number | null;
  currency?: Currency;
  worn?: boolean;
  consumable?: boolean;
  replaceable?: boolean;
  isprivate?: boolean;
  link?: string | null;
  notes?: string | null;
  list?: string | null;
  quantity?: number;
  onHeadingClick?: () => void;
  menu?: JSX.Element | null;
  dragging?: boolean;
  purchaseDate?: Date | null;
};

const GearCard: FC<GearCardProps> = ({
  name,
  manufacturer,
  kind,
  imageUrl,
  onHeadingClick,
  weight,
  price,
  currency,
  quantity,
  worn,
  consumable,
  replaceable,
  isprivate,
  link,
  notes,
  list,
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
        manufacturer={manufacturer}
        kind={kind}
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
          list={list}
          isprivate={isprivate}
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
