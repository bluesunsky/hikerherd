import type { FC } from "react";
import type { DragAndDropState } from "app/components/drag-and-drop/contexts/gear-dnd-context";

import { useState } from "react";
import { useMutation } from "blitz";

import { FcPlus, FcList, FcRating, FcSearch } from "react-icons/fc";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";

import AddPackGearForm from "app/apps/pack-gear/components/add-pack-gear-form";
import TabModal from "app/components/tab-modal";
import GlobalGearSearch from "app/apps/discover/components/global-gear-search";

import addGearToPackMutation from "../mutations/add-gear-to-pack-mutation";

import PackAddInventoryItem from "./pack-add-inventory-item";

type PackAddItemModalProps = {
  categoryId: string | null;
  categories: DragAndDropState;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const PackAddItemModal: FC<PackAddItemModalProps> = ({
  categoryId,
  categories,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [addGearToPack] = useMutation(addGearToPackMutation);
  const toast = useToast();

  const [isAddingFromSearch, setIsAddingFromSearch] = useState<string | null>(
    null
  );

  const handleSuccess = () => {
    onSuccess();
    toast({
      title: "Succès",
      description: "Cet équipement a été ajouté à votre pack.",
      status: "success",
    });
  };

  const addToPack = async (gearId: string) => {
    if (categoryId) {
      await addGearToPack({ gearId, categoryId });
      handleSuccess();
    }
  };

  return (
    <TabModal
      isOpen={isOpen}
      onClose={onClose}
      tabs={[
        {
          title: "Inventaire",
          icon: FcList,
          content: (
            <PackAddInventoryItem
              type="INVENTORY"
              addToPack={addToPack}
              categories={categories}
            />
          ),
        },
        {
          title: "Souhaits",
          icon: FcRating,
          content: (
            <PackAddInventoryItem
              type="WISH_LIST"
              addToPack={addToPack}
              categories={categories}
            />
          ),
        },
        {
          title: "Nouveau",
          icon: FcPlus,
          content: (
            <AddPackGearForm
              categoryId={categoryId}
              onClose={onClose}
              onSuccess={() => {
                handleSuccess();
                onClose();
              }}
            />
          ),
        },
        {
          title: "Recherche",
          icon: FcSearch,
          content: (
            <GlobalGearSearch
              gearActions={(gear) => (
                <Button
                  isFullWidth
                  size="sm"
                  colorScheme="green"
                  isLoading={isAddingFromSearch === gear.id}
                  onClick={async () => {
                    if (categoryId) {
                      setIsAddingFromSearch(gear.id);
                      await addToPack(gear.id);
                      setIsAddingFromSearch(null);
                    }
                  }}
                >
                  Ajouter
                </Button>
              )}
            />
          ),
        },
      ]}
    />
  );
};

export default PackAddItemModal;
