import type { FC } from "react";

import { useState } from "react";

import { HStack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => Promise<any>;
};

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalHeader>{title}</ModalHeader>

        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={confirm} isLoading={isLoading}>
              Supprimer
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
