import type { Gear } from "db";
import type { FC } from "react";

import { useQuery } from "blitz";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Tooltip } from "@chakra-ui/tooltip";
import { SimpleGrid, Stack, HStack, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { Tag } from "@chakra-ui/tag";
import { IconButton, Button } from "@chakra-ui/button";
import {
  FaMinus,
  FaPlus,
  FaCalendarAlt,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaWeightHanging,
  FaTag,
  FaClock,
} from "react-icons/fa";
import { MdOutlineSubtitles } from "react-icons/md";

import GearCard from "app/apps/gear/components/gear-card/components/gear-card";
import UserTag from "app/components/user-tag";
import HeaderIconButton from "app/components/header/components/header-icon-button";

import searchGearQuery from "../queries/search-gear-query";

import SearchInput from "./search-input";
import SearchResults from "./search-results";

type GlobalGearSearchProps = {
  gearActions: (item: Gear) => JSX.Element;
};

export enum UserStatus {
  asc = "asc",
  desc = "desc",
}

const GlobalGearSearch: FC<GlobalGearSearchProps> = ({ gearActions }) => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  const take = 10;
  const [sortBy, setSortBy] = useState("name");
  //const [sortByIcon, setSortByIcon] = useState<IconType>(FaClock);
  const [sortDir, setSortDir] = useState<UserStatus>(UserStatus.asc);
  //const [sortDirIcon, setSortDirIcon] = useState<IconType>(FaSortAlphaDownAlt);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const updateBgColor = useColorModeValue(
    "rgba(0,0,0,0.05)",
    "rgba(255,255,255,0.05)"
  );
  const [items, { isLoading }] = useQuery(
    searchGearQuery,
    { query, sortBy, sortDir, take, skip },
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

        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="ghost"
              px={1}
              noOfLines={1}
            >
              <Icon
                as={
                  sortBy == "name"
                    ? MdOutlineSubtitles
                    : sortBy == "weight"
                    ? FaWeightHanging
                    : sortBy == "price"
                    ? FaTag
                    : FaClock
                }
                w={5}
                h={5}
              />
            </MenuButton>

            <MenuList>
              <MenuItem
                icon={<MdOutlineSubtitles />}
                onClick={() => {
                  setSortBy("name");
                  setSortDir(UserStatus.asc);
                  setSkip(0);
                  setPage(1);
                }}
              >
                {t("Name", "Name")}
              </MenuItem>
              <MenuItem
                icon={<FaWeightHanging />}
                onClick={() => {
                  setSortBy("weight");
                  setSortDir(UserStatus.asc);
                  setSkip(0);
                  setPage(1);
                }}
              >
                {t("Weight", "Weight")}
              </MenuItem>
              <MenuItem
                icon={<FaTag />}
                onClick={() => {
                  setSortBy("price");
                  setSortDir(UserStatus.asc);
                  setSkip(0);
                  setPage(1);
                }}
              >
                {t("Price", "Price")}
              </MenuItem>
              <MenuItem
                icon={<FaClock />}
                onClick={() => {
                  setSortBy("purchaseDate");
                  setSortDir(UserStatus.desc);
                  setSkip(0);
                  setPage(1);
                }}
              >
                {t("PurchaseDate", "PurchaseDate")}
              </MenuItem>
            </MenuList>
          </Menu>

          <HeaderIconButton
            label=""
            onClick={() => {
              if (sortDir == UserStatus.desc) {
                setSortDir(UserStatus.asc);
              } else {
                setSortDir(UserStatus.desc);
              }
            }}
            icon={
              <Icon
                as={
                  sortDir == UserStatus.desc
                    ? FaSortAlphaDownAlt
                    : FaSortAlphaDown
                }
                w={5}
                h={5}
              />
            }
          />
        </Flex>
        {items && (
          <Text fontSize="sm">
            {(page - 1) * take + (items ? items.length : 0)}{" "}
            {items && items?.length > 1
              ? t("Gears", "Gears").toLowerCase()
              : t("Gear", "Gear").toLowerCase()}
            {items && items?.length < take
              ? ""
              : " " + t("AndMore", "and more")}
          </Text>
        )}
        {!items && <Text fontSize="sm"></Text>}
      </HStack>
      <SearchResults query={query} items={items || []} isLoading={isLoading}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
          {items?.map((item: any) => (
            <GearCard
              key={item.id}
              name={item.name}
              manufacturer={item.manufacturer}
              kind={item.kind}
              weight={item.weight}
              price={item.price}
              currency={item.currency}
              consumable={item.consumable}
              replaceable={item.replaceable}
              isprivate={item.private}
              link={item.link}
              notes={item.notes}
              imageUrl={item.imageUrl}
              purchaseDate={item.purchaseDate}
            >
              {gearActions(item)}
              <HStack justifyContent="space-between" mt={2}>
                <Tooltip label={t("UpdateTime", "Update time")}>
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
