import type { FC } from "react";
import type { Currency } from "db";

import { memo, useContext } from "react";

import { useTranslation } from "react-i18next";
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

const GearCardValues: FC<GearCardValuesProps> = memo(
  ({ weight, price, currency, quantity, worn, purchaseDate }) => {
    const { weightUnit } = useContext(userPreferencesContext);
    const { t } = useTranslation();
    const months = [
      t("Month01", "january"),
      t("Month02", "february"),
      t("Month03", "march"),
      t("Month04", "april"),
      t("Month05", "may"),
      t("Month06", "june"),
      t("Month07", "july"),
      t("Month08", "august"),
      t("Month09", "september"),
      t("Month10", "october"),
      t("Month11", "november"),
      t("Month12", "december"),
    ];
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
        // the plurial rules are not the same regarding languages
        if (y > 0) {
          if (y < 10) y = Math.round((y + m / 12) * 10) / 10;
          if (y == 1) age += y + " " + t("Year", "year");
          else if (y >= 2) age += y + " " + t("Years", "years");
          else age += y + " " + t("Year(s)", "years");
        }
        if (!age) {
          if (m == 1) age += " " + m + " " + t("Month", "month");
          else if (m >= 2) age += " " + m + " " + t("Months", "months");
          else if (m > 0) age += " " + m + " " + t("Month(s)", "months");
        }
        if (!age) {
          if (d == 1) age += " " + d + " " + t("Day", "day");
          else if (d >= 2) age += " " + d + " " + t("Days", "days");
          else if (d > 0) age += " " + d + " " + t("Day(s)", "days");
        }
        if (!age) age = t("Today", "Today");
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
              " " +
              t("InTheBackpack", "In the backpack").toLowerCase()
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
              " " +
              t("OnOneself", "On oneself").toLowerCase()
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
          <Tooltip label={t("Quantity", "Quantity")}>
            <Tag colorScheme="orange" size="sm">
              <TagLeftIcon as={GrClose} />
              <TagLabel>{quantity}</TagLabel>
            </Tag>
          </Tooltip>
        )}

        {purchaseDate && (
          <Tooltip
            label={
              t("BoughtIn", "Bought in") +
              " " +
              purchasePeriod +
              (age
                ? ", " +
                  (age == t("Today", "Today")
                    ? age.toLowerCase()
                    : t("Ago", "{{age}} ago", { age: age }))
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
