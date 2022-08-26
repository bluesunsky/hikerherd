import type { FC, ReactElement } from "react";

import { useContext } from "react";

import { useTranslation } from "react-i18next";
import { IconButton } from "@chakra-ui/button";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import { FaInfo } from "react-icons/fa";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import Popover from "app/components/popover";
import { displayWeight, withDecimalPlaces } from "app/helpers/display-weight";

import packContext from "../contexts/pack-context";

type TotalRowProps = {
  description?: string;
  name: string;
  price?: ReactElement;
  weight: number;
  fontWeight?: string;
};

const TotalRow: FC<TotalRowProps> = ({
  description = "",
  name,
  weight,
  price,
  fontWeight = "bold",
}) => {
  const { weightUnit } = useContext(userPreferencesContext);

  return (
    <Tr fontWeight={fontWeight}>
      <Td>
        {description && (
          <Popover
            trigger={
              <IconButton
                size="sm"
                minW={3}
                h={3}
                variant="ghost"
                aria-label="What is this?"
                icon={<FaInfo />}
                color="gray.400"
              />
            }
          >
            {description}
          </Popover>
        )}
      </Td>
      <Td>{name}</Td>
      <Td isNumeric>{price}</Td>
      <Td isNumeric>{displayWeight(weight, weightUnit, true)}</Td>
    </Tr>
  );
};

type PackTableProps = {
  colors: string[];
};

const PackTable: FC<PackTableProps> = ({ colors }) => {
  const { categories, totalWeight, packWeight, baseWeight, eur, usd, gbp } =
    useContext(packContext);
  const { weightUnit } = useContext(userPreferencesContext);
  const { t } = useTranslation();
  return (
    <Stack w="100%" align="flex-end" spacing={6}>
      <Stack alignSelf="stretch">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="40px"></Th>
              <Th>{t("Category", "Category")}</Th>
              <Th isNumeric>{t("Price", "Price")}</Th>
              <Th isNumeric>{t("Weight", "Weight")}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {categories.map((category, index) => (
              <Tr key={category.id}>
                <Td>
                  <Box
                    bg={colors[index % colors.length]}
                    w={3}
                    h={3}
                    borderRadius="full"
                  />
                </Td>
                <Td>{category.name}</Td>
                <Td isNumeric>
                  {category.eur != 0 && (
                    <Text>
                      {withDecimalPlaces(Number(category.eur) / 100, 0)}€
                    </Text>
                  )}
                  {category.usd != 0 && (
                    <Text>
                      {withDecimalPlaces(Number(category.usd) / 100, 0)}$
                    </Text>
                  )}
                  {category.gbp != 0 && (
                    <Text>
                      {withDecimalPlaces(Number(category.gbp) / 100, 0)}£
                    </Text>
                  )}
                </Td>
                <Td isNumeric>
                  {displayWeight(category.weight, weightUnit, true)}
                </Td>
              </Tr>
            ))}

            <TotalRow
              description={t(
                "TotalDetail",
                "Total including your worn items and your consumables."
              )}
              name={t("Total", "Total")}
              price={
                <>
                  {eur != 0 && <Text>{withDecimalPlaces(eur / 100, 0)}€</Text>}
                  {usd != 0 && <Text>{withDecimalPlaces(usd / 100, 0)}$</Text>}
                  {gbp != 0 && <Text>{withDecimalPlaces(gbp / 100, 0)}£</Text>}
                </>
              }
              weight={totalWeight}
            />

            <TotalRow
              description={t(
                "TotalBackpack",
                "Total including your consumables but without your worn items."
              )}
              name={t("InTheBackpack", "In The Backpack")}
              weight={packWeight}
            />

            <TotalRow
              name={t("Base", "Base gears")}
              weight={baseWeight}
              fontWeight="normal"
            />

            <TotalRow
              name={t("Consumables", "Consumables")}
              weight={packWeight - baseWeight}
              fontWeight="normal"
            />
            <TotalRow
              description={t("OnOneselfDetail", "Items Worn on oneself")}
              name={t("OnOneself", "On oneself")}
              weight={totalWeight - packWeight}
            />
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default PackTable;
