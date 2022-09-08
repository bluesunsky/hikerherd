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
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { useField } from "react-final-form";

import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import TextField from "app/components/forms/components/text-field";
import TextAreaField from "app/components/forms/components/text-area-field";
import CheckboxField from "app/components/forms/components/checkbox-field";
import SelectField from "app/components/forms/components/select-field";
import DateField from "app/components/forms/components/date-field";
import HorizontalScroller from "app/components/drag-and-drop/components/horizontal-scroller";

type GearFormFieldsProps = {
  includeWorn?: boolean;
};
const IMAGES = [
  "1.CAMPING.1.TENT.1.1_PERSON",
  "1.CAMPING.1.TENT.2.2_PERSON",
  "1.CAMPING.1.TENT.3.3_PERSON",
  "1.CAMPING.1.TENT.4.TARP",
  "1.CAMPING.1.TENT.5.BIVY",
  "1.CAMPING.1.TENT.6.HAMMOCK",
  "1.CAMPING.1.TENT.7.INSECT_PROTECTION",
  "1.CAMPING.1.TENT.8.ACCESSORY",
  "1.CAMPING.2.BED.1.AIRBED",
  "1.CAMPING.2.BED.2.SELF_INFLATING",
  "1.CAMPING.2.BED.3.MAT",
  "1.CAMPING.2.BED.4.CAMP_BED",
  "1.CAMPING.2.BED.5.ACCESSORY",
  "1.CAMPING.3.SLEEPING_BAG.1",
  "1.CAMPING.3.SLEEPING_BAG.2.QUILTS",
  "1.CAMPING.3.SLEEPING_BAG.3.PILLOW",
  "1.CAMPING.3.SLEEPING_BAG.4.LINER",
  "1.CAMPING.4.CAMP.1.CHAIR",
  "1.CAMPING.4.CAMP.2.TABLE",
  "1.CAMPING.4.CAMP.3.FURNITURE",
  "1.CAMPING.4.CAMP.4.CLEAN_REPAIR",
  "2.TREK.1.BAG.1.RUCKSACK.1.PACKBACK",
  "2.TREK.1.BAG.1.RUCKSACK.2.PACKBACK",
  "2.TREK.1.BAG.1.RUCKSACK.3.DAY_PACK",
  "2.TREK.1.BAG.1.RUCKSACK.4.RUNNING_PACK",
  "2.TREK.1.BAG.1.RUCKSACK.5.BOTTLE_BELT",
  "2.TREK.1.BAG.1.RUCKSACK.6.KIT_BAG",
  "2.TREK.1.BAG.1.RUCKSACK.7.ACCESSORY",
  "2.TREK.1.BAG.1.RUCKSACK.8.WAIST_PACK",
  "2.TREK.1.BAG.2.STUFFSACK.0.BAG",
  "2.TREK.1.BAG.2.STUFFSACK.1.STUFFSACK",
  "2.TREK.1.BAG.2.STUFFSACK.2.DRYBAG",
  "2.TREK.1.BAG.2.STUFFSACK.3.COMPRESSION_DRYBAG",
  "2.TREK.1.BAG.2.STUFFSACK.4.COMPRESSION_STUFFSACK",
  "2.TREK.1.BAG.2.STUFFSACK.5.MAP_CASE",
  "2.TREK.1.BAG.2.STUFFSACK.6.WATERPROOF_POUCH",
  "2.TREK.1.BAG.2.STUFFSACK.7.WALLETS",
  "2.TREK.1.BAG.2.STUFFSACK.8.SPECIALISED_BAG",
  "2.TREK.1.BAG.2.STUFFSACK.9.NIKE_PACKING",
  "2.TREK.2.POLES.1.POLES",
  "2.TREK.2.POLES.2.Z_POLES",
  "2.TREK.2.POLES.3.ACCESSORY",
  "2.TREK.3.ORIENTATION.1.MAP",
  "2.TREK.3.ORIENTATION.2.GUIDEBOOK",
  "2.TREK.3.ORIENTATION.3.COMPASS",
  "2.TREK.3.ORIENTATION.4.NOTES",
  "3.KITCHEN.1.STOVE.1.FIRE_STARTER",
  "3.KITCHEN.1.STOVE.2.GAS_STOVE",
  "3.KITCHEN.1.STOVE.3.LIQUID_FUEL_STOVE",
  "3.KITCHEN.1.STOVE.4.MULTIFUEL_STOVE",
  "3.KITCHEN.1.STOVE.5.SOLID_FUEL_STOVE",
  "3.KITCHEN.2.DISHES.1.POT",
  "3.KITCHEN.2.DISHES.2.MUG",
  "3.KITCHEN.2.DISHES.3.UTENSIL",
  "3.KITCHEN.2.DISHES.4.TEA_COFFEE",
  "3.KITCHEN.2.DISHES.5.ACCESSORY",
  "3.KITCHEN.3.FOOD",
  "4.HYDRATATION.1.WATER_TREATMENT.1.WATER_FILTER",
  "4.HYDRATATION.1.WATER_TREATMENT.2.GRAVITY_FILTER",
  "4.HYDRATATION.1.WATER_TREATMENT.3.BOTTLE_FILTER",
  "4.HYDRATATION.1.WATER_TREATMENT.4.OTHER",
  "4.HYDRATATION.1.WATER_TREATMENT.5.ACCESSORY",
  "4.HYDRATATION.2.CONTAINER.1.BOTTLE",
  "4.HYDRATATION.2.CONTAINER.2.BOTTLE",
  "4.HYDRATATION.2.CONTAINER.3.FLASK",
  "4.HYDRATATION.2.CONTAINER.4.WATER_BLADDER",
  "4.HYDRATATION.2.CONTAINER.5.ACCESSORY",
  "5.TOOL.1.KNIVE",
  "5.TOOL.2.MULTITOOL",
  "5.TOOL.3.ICE_AXE",
  "5.TOOL.4.CLIP",
  "5.TOOL.5.SECURITY",
  "5.TOOL.6.UMBRELLA",
  "5.TOOL.7.OTHER",
  "6.ELECTRICITY.1.LIGHTING.1.HEAD_TORCH",
  "6.ELECTRICITY.1.LIGHTING.2.HAND_TORCH",
  "6.ELECTRICITY.1.LIGHTING.3.LANTERN",
  "6.ELECTRICITY.2.POWER.1.BATTERY",
  "6.ELECTRICITY.2.POWER.2.SOLAR_CHARGER",
  "7.CLOTHES.1.HEAD.1.CAP",
  "7.CLOTHES.1.HEAD.2.BUCKET_HAT",
  "7.CLOTHES.1.HEAD.3.SUN_HAT",
  "7.CLOTHES.1.HEAD.4.WATERPROOF_HAT",
  "7.CLOTHES.1.HEAD.5.NECK_FLAP",
  "7.CLOTHES.1.HEAD.6.NECKWEAR",
  "7.CLOTHES.1.HEAD.7.BEANY",
  "7.CLOTHES.1.HEAD.8.NALACLAVA",
  "7.CLOTHES.1.HEAD.9.EYEWEAR",
  "7.CLOTHES.2.TOP.1.BASELAYER.0.T_SHIRT",
  "7.CLOTHES.2.TOP.1.BASELAYER.1.SHORT_SLEEVE",
  "7.CLOTHES.2.TOP.1.BASELAYER.2.LONG_SLEEVE",
  "7.CLOTHES.2.TOP.1.BASELAYER.3.SHORT_SLEEVE_TREKKING",
  "7.CLOTHES.2.TOP.1.BASELAYER.4.LONG_SLEEVE_TREKKING",
  "7.CLOTHES.2.TOP.2.MIDLAYER.1.SYNTHETIC_SMOCK",
  "7.CLOTHES.2.TOP.2.MIDLAYER.2.ISULATED_JACKET",
  "7.CLOTHES.2.TOP.2.MIDLAYER.3.DOWN_VEST",
  "7.CLOTHES.2.TOP.2.MIDLAYER.4.DOWN_SMOCK",
  "7.CLOTHES.2.TOP.2.MIDLAYER.5.INSOLATED_HOODED_JACKET",
  "7.CLOTHES.2.TOP.2.MIDLAYER.6.DOWN_HOODED_JACKET",
  "7.CLOTHES.2.TOP.3.OUTERLAYER.1.SYNTHETIC_VEST",
  "7.CLOTHES.2.TOP.3.OUTERLAYER.2.WINDSHELL",
  "7.CLOTHES.2.TOP.3.OUTERLAYER.3.SUPERLIGHT_SMOCK",
  "7.CLOTHES.2.TOP.3.OUTERLAYER.4.FLEECE_JACKET",
  "7.CLOTHES.2.TOP.3.OUTERLAYER.5.WATERPROOF_JACKET",
  "7.CLOTHES.3.HANDS.1.ARM_SLEEVES",
  "7.CLOTHES.3.HANDS.2.HIGH_SOFTSHELL_GLOVES",
  "7.CLOTHES.3.HANDS.3.HIGH_INSULATION_GLOVES",
  "7.CLOTHES.3.HANDS.4.MITTS",
  "7.CLOTHES.4.MID.1.INDERWEAR.1.WOMAN_UNDEWEAR",
  "7.CLOTHES.4.MID.1.INDERWEAR.2.MAN_UNDEWEAR",
  "7.CLOTHES.4.MID.2.SHORT",
  "7.CLOTHES.4.MID.3.PANT.1.LONGJOHN",
  "7.CLOTHES.4.MID.3.PANT.2.FLEECE_PANTS",
  "7.CLOTHES.4.MID.3.PANT.3.RUNNING_LEGGING",
  "7.CLOTHES.4.MID.3.PANT.4.SOFTSHELL_PANT",
  "7.CLOTHES.4.MID.3.PANT.5.3_SEASONS_PANT",
  "7.CLOTHES.4.MID.3.PANT.6.TREKKING_PANT",
  "7.CLOTHES.4.MID.3.PANT.7.WONDPROOF_PANT",
  "7.CLOTHES.4.MID.3.PANT.8.DOWN_PANTS",
  "7.CLOTHES.4.MID.4.BELT",
  "7.CLOTHES.8.FOOTS.1.SOCKS",
  "7.CLOTHES.8.FOOTS.2.GAITORS",
  "7.CLOTHES.8.FOOTS.3.FOOTWEAR",
  "7.CLOTHES.8.FOOTS.4.SLIPPER_BOOTS",
  "8.HEALTH.1.FIRSTAID",
  "8.HEALTH.2.PROTECTION.1.SUN_PROTECTION",
  "8.HEALTH.2.PROTECTION.2.INSECT_REPELLENT",
  "8.HEALTH.3.WASHROOM.1.TOWEL",
  "8.HEALTH.3.WASHROOM.2.WASHBAG",
  "8.HEALTH.3.WASHROOM.3.TRAVEL_BOTTLE",
  "8.HEALTH.3.WASHROOM.4.ACCESSORY",
  "8.HEALTH.3.WASHROOM.5.SHOWER",
  "8.HEALTH.6.WASHROOM.3.TROWEL",
];

const GearFormFields: FC<GearFormFieldsProps> = ({ includeWorn }) => {
  const { weightUnit } = useContext(userPreferencesContext);
  const { t } = useTranslation();
  const {
    isOpen: imagesBankIsOpen,
    onOpen: imagesBankOnOpen,
    onClose: imagesBankOnClose,
  } = useDisclosure();

  const { input: imageInput } = useField("imageUrl");
  return (
    <>
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

        <FormLabel>{t("Image", "Image")}</FormLabel>
        <Grid templateColumns="1fr 85px " gap={2} alignItems="flex-end">
          <TextField
            name="imageUrl"
            placeholder="https://…"
            icon={<Icon color="gray.400" as={FaImage} />}
          />
          <Button onClick={imagesBankOnOpen}>
            {t("Examples", "Examples")}
          </Button>
        </Grid>

        <TextField
          name="link"
          label={t("Link", "Link")}
          placeholder="https://…"
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

      <Modal isOpen={imagesBankIsOpen} onClose={imagesBankOnClose}>
        <ModalOverlay />
        <ModalContent marginBlockEnd="0px" maxWidth="unset" w="800px">
          <ModalHeader>{t("SampleImages", "Sample images")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0px">
            <HorizontalScroller>
              <Flex
                gap="5px"
                flexWrap="wrap"
                p="0 24px"
                h="calc(100vh - 185px)"
              >
                {IMAGES?.map((image) => {
                  const url = "https://serant.fr/gear/01/" + image + ".png";
                  const tooltip = image
                    .replaceAll("_", " ")
                    .split(".")
                    .filter((x, i) => i % 2)
                    .join(" > ");
                  return (
                    <Tooltip key={image} label={tooltip}>
                      <Button
                        w="76px"
                        h="76px"
                        p="0"
                        onClick={() => {
                          imageInput.onChange(url);
                          imagesBankOnClose();
                        }}
                      >
                        <Image
                          mx="auto"
                          alt={image}
                          borderRadius="md"
                          src={url}
                        />
                      </Button>
                    </Tooltip>
                  );
                })}
              </Flex>
              <br />
              &nbsp;
            </HorizontalScroller>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GearFormFields;
