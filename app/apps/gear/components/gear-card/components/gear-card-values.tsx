import type { FC } from "react";
import type { Currency } from "db";

import { memo, useContext } from "react";

import { Wrap } from "@chakra-ui/layout";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { FaTag, FaWeightHanging, FaTshirt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Tooltip } from "@chakra-ui/tooltip";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import displayWeight from "app/helpers/display-weight";
import displayCurrency from "app/helpers/display-currency";

type GearCardValuesProps = {
  weight: number;
  price?: number | null;
  currency?: Currency;
  quantity?: number;
  worn?: boolean;
};

const GearCardValues: FC<GearCardValuesProps> = memo(
  ({ weight, price, currency, quantity, worn }) => {
    const { weightUnit } = useContext(userPreferencesContext);

    return (
      <Wrap>
        {!worn && (
          <Tooltip label="Poids dans le sac">
            <Tag colorScheme="teal" size="sm">
              <TagLeftIcon as={FaWeightHanging} />
              <TagLabel>{displayWeight(weight, weightUnit)}</TagLabel>
            </Tag>
          </Tooltip>
        )}
        {worn && (
          <Tooltip label="Poids sur soi">
            <Tag colorScheme="blue" size="sm">
              <TagLeftIcon as={FaTshirt} />
              <TagLabel>{displayWeight(weight, weightUnit)}</TagLabel>
            </Tag>
          </Tooltip>
        )}

        {Number.isInteger(price) && (
          <Tooltip label="Prix">
            <Tag colorScheme="purple" size="sm">
              <TagLeftIcon as={FaTag} />
              <TagLabel>
                {Number(price) / 100}
                {displayCurrency(currency)}
              </TagLabel>
            </Tag>
          </Tooltip>
        )}

        {(quantity === 0 || (quantity && quantity > 1)) && (
          <Tooltip label="Quantité">
            <Tag colorScheme="orange" size="sm">
              <TagLeftIcon as={GrClose} />
              <TagLabel>{quantity}</TagLabel>
            </Tag>
          </Tooltip>
        )}
      </Wrap>
    );
  }
);

export default GearCardValues;
