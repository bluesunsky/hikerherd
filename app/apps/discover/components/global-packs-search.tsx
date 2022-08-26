import type { Pack } from "db";
import type { FC } from "react";

import { useQuery } from "blitz";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { SimpleGrid, Stack, HStack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";

import PackCard from "app/apps/packs/components/pack-card";

import searchPacksQuery from "../queries/search-packs-query";

import SearchInput from "./search-input";
import SearchResults from "./search-results";

type GlobalPacksSearchProps = {
  packActions?: (item: Pack) => JSX.Element;
};

const GlobalPacksSearch: FC<GlobalPacksSearchProps> = ({ packActions }) => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("gray.100", "gray.900");

  const take = 10;
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const [items, { isLoading }] = useQuery(
    searchPacksQuery,
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
          <Text fontSize="sm">{t("Page", "Page")}</Text>
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
            {items && items?.length > 1
              ? t("Packs", "Packs").toLowerCase()
              : t("Pack", "Pack").toLowerCase()}
            {items && items?.length < take
              ? ""
              : " " + t("AndMore", "and more")}
          </Text>
        )}
      </HStack>
      <SearchResults query={query} items={items || []} isLoading={isLoading}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
          {items?.map((item) => (
            <PackCard
              key={item.id}
              pack={item}
              user={item.user}
              actions={packActions && packActions(item)}
              shareLink
              bg={cardBg}
              borderColor={border}
            ></PackCard>
          ))}
        </SimpleGrid>
      </SearchResults>
    </Stack>
  );
};

export default GlobalPacksSearch;
