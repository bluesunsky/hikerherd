import type { FC } from "react";

import { useTranslation } from "react-i18next";
import { useColorModeValue } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { Center, Box, Text } from "@chakra-ui/layout";

type SearchResultsProps = {
  query: string;
  isLoading: boolean;
  items: any[];
};

const SearchResults: FC<SearchResultsProps> = ({
  children,
  query,
  isLoading,
  items,
}) => {
  const textColor = useColorModeValue("gray.500", "gray.400");
  const { t } = useTranslation();
  return (
    <Box>
      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}

      {!isLoading && items?.length === 0 && (
        <Text pl={0} fontSize="lg" color={textColor}>
          {t("NoResultFor", "No result for '{{query}}'", {
            query: query,
          })}
        </Text>
      )}

      {!isLoading && items?.length > 0 && children}
    </Box>
  );
};

export default SearchResults;
