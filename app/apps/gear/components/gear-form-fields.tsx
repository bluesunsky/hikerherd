import type { FC } from "react";

import { useContext } from "react";

import { useTranslation } from "react-i18next";
import { Grid, Stack, HStack } from "@chakra-ui/layout";
import {
  FaImage,
  FaLink,
  FaTag,
  FaHamburger,
  FaWeightHanging,
  FaTshirt,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaLock,
} from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";
import { FormLabel } from "@chakra-ui/form-control";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import TextField from "app/components/forms/components/text-field";
import TextAreaField from "app/components/forms/components/text-area-field";
import CheckboxField from "app/components/forms/components/checkbox-field";
import SelectField from "app/components/forms/components/select-field";
import DateField from "app/components/forms/components/date-field";

type GearFormFieldsProps = {
  includeWorn?: boolean;
};

const GearFormFields: FC<GearFormFieldsProps> = ({ includeWorn }) => {
  const { weightUnit } = useContext(userPreferencesContext);
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      <TextField
        name="name"
        label={t("Name", "Name")}
        placeholder={t("NamePlaceholder", "Name (Mandatory)")}
      />
      <TextField
        name="kind"
        label={t("Kind", "Kind")}
        placeholder={t("KindPlaceholder", "Kind (Optional)")}
      />
      <TextField
        name="manufacturer"
        label={t("Manufacturer", "Manufacturer")}
        placeholder={t("ManufacturerPlaceholder", "Manufacturer (Optional)")}
      />
      <TextAreaField
        name="notes"
        label={t("Notes", "Notes")}
        placeholder={t(
          "NotesPlaceholder",
          "Extra notes about this gear (Optional)"
        )}
      />

      <TextField
        type="number"
        name="weight"
        label={t("WeightAndType", "Weight & Type of weight")}
        placeholder={t("Weight", "Weight")}
        suffix={weightUnit === "METRIC" ? "g" : "oz"}
        icon={<Icon color="teal.400" as={FaWeightHanging} />}
      />

      <HStack>
        <Tag colorScheme="pink" flexShrink={0}>
          <TagLeftIcon as={FaHamburger} />
          <TagLabel>{t("Consumbable?", "Consumbable?")}</TagLabel>
        </Tag>
        <CheckboxField name="consumable" />
        {includeWorn && (
          <>
            <Tag colorScheme="blue" flexShrink={0}>
              <TagLeftIcon as={FaTshirt} />
              <TagLabel>{t("Worn?", "Worn?")}</TagLabel>
            </Tag>
            <CheckboxField name="worn" />
          </>
        )}
      </HStack>
      <FormLabel>
        {t("PriceAndPurchaseDate", "Price & Purchase date")}
      </FormLabel>
      <Grid templateColumns="70px 1fr" gap={2} alignItems="flex-end">
        <SelectField name="currency">
          <option value="USD">$</option>
          <option value="GBP">£</option>
          <option value="EUR">€</option>
        </SelectField>
        <TextField
          type="number"
          name="price"
          placeholder="0.00"
          icon={<Icon color="purple.400" as={FaTag} />}
        />
      </Grid>
      <DateField name="purchaseDate" icon={<Icon as={FaCalendarAlt} />} />

      <TextField
        name="imageUrl"
        label={t("Image", "Image")}
        placeholder="https://..."
        icon={<Icon color="gray.400" as={FaImage} />}
      />
      <TextField
        name="link"
        label={t("Link", "Link")}
        placeholder="https://..."
        icon={<Icon color="gray.400" as={FaLink} />}
      />
      <FormLabel>{t("MoreInformation", "More information")}</FormLabel>
      <HStack>
        <Tag bg="red" color="white" flexShrink={0}>
          <TagLeftIcon as={FaExclamationTriangle} />
          <TagLabel>{t("ToReplace?", "To replace?")}</TagLabel>
        </Tag>
        <CheckboxField name="replaceable" />
        <Tag flexShrink={0}>
          <TagLeftIcon as={FaLock} />
          <TagLabel>{t("Private?", "Private?")}</TagLabel>
        </Tag>
        <CheckboxField name="private" />
      </HStack>
    </Stack>
  );
};

export default GearFormFields;
