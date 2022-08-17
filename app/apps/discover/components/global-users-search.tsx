import type { FC } from "react";

import { useQuery } from "blitz";
import { useState } from "react";

import { SimpleGrid, Stack, HStack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";

import UserCard from "app/apps/users/components/user-card";

import searchUsersQuery from "../queries/search-users-query";

import SearchInput from "./search-input";
import SearchResults from "./search-results";

type GlobalUsersSearchProps = {};

const GlobalUsersSearch: FC<GlobalUsersSearchProps> = () => {
  const [query, setQuery] = useState("");

  const take = 10;
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const [items, { isLoading }] = useQuery(
    searchUsersQuery,
    { query, take, skip },
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
            <UserCard key={item.id} user={item} />
          ))}
        </SimpleGrid>
      </SearchResults>
    </Stack>
  );
};

export default GlobalUsersSearch;
