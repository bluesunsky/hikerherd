import type { FC } from "react";

import { useState } from "react";

import { useTranslation } from "react-i18next";
import { HStack, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

type QuantityPickerProps = {
  isLoading: boolean;
  onIncrement: () => Promise<void>;
  onDecrement: () => Promise<void>;
  value: number;
};

const QuantityPicker: FC<QuantityPickerProps> = ({
  isLoading,
  onIncrement,
  onDecrement,
  value,
}) => {
  const { t } = useTranslation();
  const [isDecrementing, setIsDecrementing] = useState(false);
  const [isIncrementing, setIsIncrementing] = useState(false);

  return (
    <HStack py={1} px={3} justify="space-between">
      <HStack spacing={3}>
        <Icon w={3} h={3} as={GrClose} />
        <Text>{t("Quantity", "Quantity")}</Text>
      </HStack>

      <HStack border="1px solid" borderColor="gray.100" rounded="full" p="2px">
        <IconButton
          size="xs"
          rounded="full"
          icon={<FaMinus />}
          aria-label="decrement quantity"
          isDisabled={isLoading || value <= 0}
          isLoading={isDecrementing}
          onClick={async () => {
            setIsDecrementing(true);
            await onDecrement();
            setIsDecrementing(false);
          }}
        />
        <Text fontSize="sm">{value}</Text>
        <IconButton
          size="xs"
          rounded="full"
          icon={<FaPlus />}
          aria-label="increment quantity"
          isDisabled={isLoading}
          isLoading={isIncrementing}
          onClick={async () => {
            setIsIncrementing(true);
            await onIncrement();
            setIsIncrementing(false);
          }}
        />
      </HStack>
    </HStack>
  );
};

export default QuantityPicker;
