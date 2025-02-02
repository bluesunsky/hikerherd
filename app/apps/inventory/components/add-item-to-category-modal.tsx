import type { FC } from "react";

import { useState } from "react";
import { useMutation } from "blitz";

import { useTranslation } from "react-i18next";
import { FcPlus, FcSearch } from "react-icons/fc";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";

import TabModal from "app/components/tab-modal";
import AddCategoryGearForm from "app/apps/category-gear/components/add-category-gear-form";
import GlobalGearSearch from "app/apps/discover/components/global-gear-search";
import addToInventoryMutation from "app/apps/discover/mutations/add-to-inventory-mutation";

type AddItemToCategoryModalProps = {
  categoryId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const AddItemToCategoryModal: FC<AddItemToCategoryModalProps> = ({
  categoryId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [addToInventory] = useMutation(addToInventoryMutation);
  const [isAdding, setIsAdding] = useState<string | null>(null);

  const handleSuccess = () => {
    setIsAdding(null);
    onSuccess();
    toast({
      title: t("Success", "Success"),
      description: t("AddItemSuccess", "The item has been added."),
      status: "success",
    });
    onClose();
  };

  return (
    <TabModal
      isOpen={isOpen}
      onClose={onClose}
      tabs={[
        {
          title: t("New", "New"),
          icon: FcPlus,
          content: (
            <AddCategoryGearForm
              categoryId={categoryId}
              onClose={onClose}
              onSuccess={handleSuccess}
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
                  isLoading={isAdding === gear.id}
                  size="sm"
                  colorScheme="green"
                  onClick={async () => {
                    if (categoryId) {
                      setIsAdding(gear.id);
                      await addToInventory({
                        gearId: gear.id,
                        categoryId,
                      });
                      handleSuccess();
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

export default AddItemToCategoryModal;
