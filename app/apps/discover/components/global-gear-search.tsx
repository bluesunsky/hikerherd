import type { Gear } from "db";
import type { FC } from "react";

import { useQuery } from "blitz";
import { useState } from "react";

import { useColorModeValue } from "@chakra-ui/react";
import { format } from "date-fns";
import { Tooltip } from "@chakra-ui/tooltip";
import { SimpleGrid, Stack, HStack, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { Tag } from "@chakra-ui/tag";
import { IconButton } from "@chakra-ui/button";
import { FaMinus, FaPlus, FaCalendarAlt } from "react-icons/fa";

import GearCard from "app/apps/gear/components/gear-card/components/gear-card";
import UserTag from "app/components/user-tag";

import searchGearQuery from "../queries/search-gear-query";

import SearchInput from "./search-input";
import SearchResults from "./search-results";

type GlobalGearSearchProps = {
  gearActions: (item: Gear) => JSX.Element;
};

const GlobalGearSearch: FC<GlobalGearSearchProps> = ({ gearActions }) => {
  const [query, setQuery] = useState("");

  const take = 10;
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const updateBgColor = useColorModeValue(
    "rgba(0,0,0,0.05)",
    "rgba(255,255,255,0.05)"
  );
  const [items, { isLoading }] = useQuery(
    searchGearQuery,
    { query, take, skip },
    //{ suspense: false, enabled: !!query }
    { suspense: false }
  );

  return (
    <Stack spacing={3}>
      <SearchInput
        setQuery={async (x) => {
          setQuery(x);
          setSkip(0);
          setPage(1);
        }}
      />
      <HStack justifyContent="space-between">
        <HStack>
          <Text fontSize="sm">Page</Text>
          <HStack
            border="1px solid"
            borderColor="gray.100"
            rounded="full"
            p="2px"
          >
            <IconButton
              size="xs"
              rounded="full"
              icon={<FaMinus />}
              aria-label="decrement quantity"
              isDisabled={page <= 1}
              onClick={async () => {
                setSkip((page - 2) * take);
                setPage(page - 1);
              }}
            />
            <Text fontSize="sm">{page}</Text>
            <IconButton
              size="xs"
              rounded="full"
              icon={<FaPlus />}
              aria-label="increment quantity"
              isDisabled={items ? items?.length < take : true}
              onClick={async () => {
                setSkip(page * take);
                setPage(page + 1);
              }}
            />
          </HStack>
        </HStack>
        {items && (
          <Text fontSize="sm">
            {(page - 1) * take + (items ? items.length : 0)}{" "}
            {items && items?.length > 1 ? "résultats" : "résultat"}
            {items && items?.length < take ? "" : "  et plus"}
          </Text>
        )}
      </HStack>
      <SearchResults query={query} items={items || []} isLoading={isLoading}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
          {items?.map((item) => (
            <GearCard
              key={item.id}
              name={item.name}
              manufacturer={item.manufacturer}
              weight={item.weight}
              price={item.price}
              currency={item.currency}
              consumable={item.consumable}
              replaceable={item.replaceable}
              link={item.link}
              notes={item.notes}
              imageUrl={item.imageUrl}
              purchaseDate={item.purchaseDate}
            >
              {gearActions(item)}
              <HStack justifyContent="space-between" mt={2}>
                <Tooltip label="Mise à jour">
                  <Tag size="sm" borderRadius="full" bg={updateBgColor}>
                    <Icon as={FaCalendarAlt} />
                    &nbsp;
                    {format(item.updatedAt, "dd/MM/yyyy")}
                  </Tag>
                </Tooltip>
                <UserTag size="sm" user={item.user} />
              </HStack>
            </GearCard>
          ))}
        </SimpleGrid>
      </SearchResults>
    </Stack>
  );
};

export default GlobalGearSearch;
