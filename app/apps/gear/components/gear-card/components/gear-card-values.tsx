import type { FC } from "react";
import type { Currency } from "db";

import { memo, useContext } from "react";

import { Wrap } from "@chakra-ui/layout";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { FaTag, FaWeightHanging, FaTshirt, FaClock } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Tooltip } from "@chakra-ui/tooltip";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import displayCurrency from "app/helpers/display-currency";
import { displayWeight, withDecimalPlaces } from "app/helpers/display-weight";

type GearCardValuesProps = {
  weight: number;
  price?: number | null;
  currency?: Currency;
  quantity?: number;
  worn?: boolean;
  purchaseDate?: Date | null;
};

const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const GearCardValues: FC<GearCardValuesProps> = memo(
  ({ weight, price, currency, quantity, worn, purchaseDate }) => {
    const { weightUnit } = useContext(userPreferencesContext);

    var age = "";
    if (purchaseDate) {
      var today = new Date();
      if (today > purchaseDate) {
        var y = today.getFullYear() - purchaseDate.getFullYear();
        var m = today.getMonth() - purchaseDate.getMonth();
        var d = today.getDate() - purchaseDate.getDate();
        if (d < 0) {
          m--;
          var m0 = today.getMonth();
          var y0 = today.getFullYear();
          if (m0 < 0) {
            y0 -= 1;
          }
          d += new Date(y0, m0, 0).getDate();
        }
        if (m < 0 || (m === 0 && d < 0)) {
          y--;
        }
        if (m < 0) m += 12;
        if (y > 0) {
          if (y < 10) y = Math.round((y + m / 12) * 10) / 10;

          if (y >= 2) age += y + " ans";
          else age += y + " an";
        }
        if (!age) {
          if (m > 0) age += " " + m + " mois";
        }
        if (!age) {
          if (d > 1) age += " " + d + " jours";
          else if (d > 0) age += " " + d + " jour";
        }
        if (!age) age = "Aujourd'hui";
      }
    }

    const purchasePeriod: string =
      "" +
      months[purchaseDate ? purchaseDate.getMonth() : 0] +
      " " +
      purchaseDate?.getUTCFullYear();

    return (
      <Wrap>
        {!worn && weight != 0 && (
          <Tooltip
            label={
              (quantity && quantity > 1 ? quantity + " x " : "") +
              displayWeight(weight, weightUnit) +
              " dans le sac"
            }
          >
            <Tag colorScheme="teal" size="sm">
              <TagLeftIcon as={FaWeightHanging} />
              <TagLabel>
                {displayWeight((quantity ? quantity : 1) * weight, weightUnit)}
              </TagLabel>
            </Tag>
          </Tooltip>
        )}
        {worn && weight != 0 && (
          <Tooltip
            label={
              (quantity && quantity > 1 ? quantity + " x " : "") +
              displayWeight(weight, weightUnit) +
              " sur soi"
            }
          >
            <Tag colorScheme="blue" size="sm">
              <TagLeftIcon as={FaTshirt} />
              <TagLabel>
                {displayWeight((quantity ? quantity : 1) * weight, weightUnit)}
              </TagLabel>
            </Tag>
          </Tooltip>
        )}

        {Number.isInteger(price) && (
          <Tooltip
            label={
              (quantity && quantity > 1 ? quantity + " x " : "") +
              withDecimalPlaces(Number(price) / 100, 2) +
              displayCurrency(currency)
            }
          >
            <Tag colorScheme="purple" size="sm">
              <TagLeftIcon as={FaTag} />
              <TagLabel>
                {withDecimalPlaces(
                  ((quantity ? quantity : 1) * Number(price)) / 100,
                  0
                )}
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

        {purchaseDate && (
          <Tooltip
            label={
              "Acheté en " +
              purchasePeriod +
              (age
                ? ", " +
                  (age == "Aujourd'hui" ? "aujourd'hui" : "il y a " + age)
                : "")
            }
          >
            <Tag colorScheme="gray" size="sm">
              <TagLeftIcon as={FaClock} />
              <TagLabel>{age ? age : purchasePeriod}</TagLabel>
            </Tag>
          </Tooltip>
        )}
      </Wrap>
    );
  }
);

export default GearCardValues;
