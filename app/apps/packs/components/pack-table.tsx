import type { FC } from "react";

import { useContext } from "react";

import { Button, IconButton } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import { FaFlagUsa, FaGlobeEurope, FaInfo } from "react-icons/fa";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import Popover from "app/components/popover";
import displayWeight from "app/helpers/display-weight";

import packContext from "../contexts/pack-context";

type TotalRowProps = {
  description?: string;
  name: string;
  value: number;
  fontWeight?: string;
};

const TotalRow: FC<TotalRowProps> = ({
  description = "",
  name,
  value,
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
      <Td isNumeric>{displayWeight(value, weightUnit, true)}</Td>
    </Tr>
  );
};

type PackTableProps = {
  colors: string[];
};

const PackTable: FC<PackTableProps> = ({ colors }) => {
  const { categories, totalWeight, packWeight, baseWeight } =
    useContext(packContext);
  const { weightUnit, toggleWeightUnits } = useContext(userPreferencesContext);

  return (
    <Stack w="100%" align="flex-end" spacing={6}>
      <Stack alignSelf="stretch">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="40px"></Th>
              <Th>Catégorie</Th>
              <Th isNumeric>Poids</Th>
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
                  {displayWeight(category.weight, weightUnit, true)}
                </Td>
              </Tr>
            ))}

            <TotalRow
              description="Poids de tout, y compris vos articles portés sur soi et vos consommables."
              name="Poids total"
              value={totalWeight}
            />

            <TotalRow
              description="Poids incluant les consommables mais sans les articles portés sur soi."
              name="Poids du sac"
              value={packWeight}
            />

            <TotalRow
              name="Poids de base"
              value={baseWeight}
              fontWeight="normal"
            />

            <TotalRow
              name="Poids des consommables"
              value={packWeight - baseWeight}
              fontWeight="normal"
            />
            <TotalRow
              description="Poids des articles portés sur soi."
              name="Poids sur soi"
              value={totalWeight - packWeight}
            />
          </Tbody>
        </Table>
      </Stack>

      <Button
        size="xs"
        onClick={toggleWeightUnits}
        leftIcon={weightUnit === "METRIC" ? <FaFlagUsa /> : <FaGlobeEurope />}
      >
        {weightUnit === "IMPERIAL"
          ? "Utiliser les unités métriques"
          : "Utiliser les unités impériales"}
      </Button>
    </Stack>
  );
};

export default PackTable;
