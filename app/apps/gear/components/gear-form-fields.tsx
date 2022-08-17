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
      <TextAreaField
        name="notes"
        label="Description"
        placeholder="Information à propos de l'équipement"
      />
      <TextField
        type="number"
        name="weight"
        label="Poids & Type de poids"
        placeholder="Poids"
        suffix={weightUnit === "METRIC" ? "g" : "oz"}
        icon={<Icon color="teal.400" as={FaWeightHanging} />}
      />

      <HStack>
        <Tag colorScheme="pink" flexShrink={0}>
          <TagLeftIcon as={FaHamburger} />
          <TagLabel>Consommable ?</TagLabel>
        </Tag>
        <CheckboxField name="consumable" />
        {includeWorn && (
          <>
            <Tag colorScheme="blue" flexShrink={0}>
              <TagLeftIcon as={FaTshirt} />
              <TagLabel>Porté ?</TagLabel>
            </Tag>
            <CheckboxField name="worn" />
          </>
        )}
      </HStack>
      <FormLabel>Coût & Date d&lsquo;achat</FormLabel>
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
        label="Image"
        placeholder="https://..."
        icon={<Icon color="gray.400" as={FaImage} />}
      />
      <TextField
        name="link"
        label="Lien"
        placeholder="https://..."
        icon={<Icon color="gray.400" as={FaLink} />}
      />
    </Stack>
  );
};

export default GearFormFields;
