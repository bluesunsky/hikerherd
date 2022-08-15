import type { FC } from "react";

import { useContext } from "react";

import { Grid, Stack, HStack } from "@chakra-ui/layout";
import {
  FaImage,
  FaLink,
  FaTag,
  FaHamburger,
  FaWeightHanging,
  FaTshirt,
  FaCalendarAlt,
} from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";
import { FormLabel } from "@chakra-ui/form-control";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import TextDivider from "app/components/text-divider";
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
  /*
<DatePicker
        label="Date d'achat"
        name="purchaseDate"
      />
      */
  return (
    <Stack spacing={4}>
      <TextField name="name" label="Nom" placeholder="Nom" />

      <TextField
        type="number"
        name="weight"
        label="Poids"
        placeholder="Poids"
        suffix={weightUnit === "METRIC" ? "g" : "oz"}
        icon={<Icon color="teal.400" as={FaWeightHanging} />}
      />

      <FormLabel>Tags</FormLabel>

      <HStack>
        <Tag colorScheme="pink" flexShrink={0}>
          <TagLeftIcon as={FaHamburger} />
          <TagLabel>Consommable ?</TagLabel>
        </Tag>
        <CheckboxField name="consumable" />
      </HStack>

      {includeWorn && (
        <HStack>
          <Tag colorScheme="blue" flexShrink={0}>
            <TagLeftIcon as={FaTshirt} />
            <TagLabel>Porté ?</TagLabel>
          </Tag>
          <CheckboxField name="worn" />
        </HStack>
      )}

      <TextDivider>Compléments</TextDivider>
      <DateField
        label="Date d'achat"
        name="purchaseDate"
        icon={<Icon as={FaCalendarAlt} />}
      />

      <Grid templateColumns="70px 1fr" gap={2} alignItems="flex-end">
        <SelectField label="Prix" name="currency">
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

      <TextField
        name="link"
        label="Lien"
        placeholder="https://..."
        icon={<Icon color="gray.400" as={FaLink} />}
      />

      <TextField
        name="imageUrl"
        label="Image"
        placeholder="https://..."
        icon={<Icon color="gray.400" as={FaImage} />}
      />

      <TextAreaField
        name="notes"
        label="Notes"
        placeholder="Information à propos de l'équipement"
      />
    </Stack>
  );
};

export default GearFormFields;
