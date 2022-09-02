import type { FC } from "react";
import type { DragAndDropState } from "app/components/drag-and-drop/contexts/gear-dnd-context";

import { useState } from "react";
import { useMutation } from "blitz";

import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [isAddingFromSearch, setIsAddingFromSearch] = useState<string | null>(
    null
  );

  const handleSuccess = () => {
    onSuccess();
    toast({
      title: t("Success", "Succes"),
      description: t("AddItemSuccess", "L'élément a été ajouté."),
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
          title: t("Inventory", "Inventory"),
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
          title: t("WishList", "Wish list"),
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
          title: t("New", "New"),
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
          title: t("Search", "Search"),
          icon: FcSearch,
          content: (
            <GlobalGearSearch
              gearActions={(gear) => (
                <Button
                  width="full"
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
                  {t("Add", "Add")}
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
