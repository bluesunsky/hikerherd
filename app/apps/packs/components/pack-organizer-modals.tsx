import type { FC } from "react";
import type { DragAndDropState } from "app/components/drag-and-drop/contexts/gear-dnd-context";

import { useContext, Fragment } from "react";
import { useMutation } from "blitz";

import { useTranslation } from "react-i18next";

import gearOrganizerContext from "app/apps/inventory/contexts/gear-organizer-context";
import deletePackCategoryMutation from "app/apps/pack-categories/mutations/delete-pack-category-mutation";
import deletePackGearMutation from "app/apps/pack-gear/mutations/delete-pack-gear-mutation";
import PackCategoryForm from "app/apps/pack-categories/components/pack-category-form";
import ConfirmModal from "app/components/confirm-modal";
import UpdatePackGearForm from "app/apps/pack-gear/components/update-pack-gear-form";

import PackAddItemModal from "./pack-add-item-modal";

type PackOrganizerModalsProps = {
  id: string;
  categories: DragAndDropState;
};

const PackOrganizerModals: FC<PackOrganizerModalsProps> = ({
  id,
  categories,
}) => {
  const {
    refetch,

    addingCategory,
    editingCategory,
    deletingCategory,

    addingItemToCategory,
    deletingItem,
    editingItem,

    closeModals,
  } = useContext(gearOrganizerContext);
  const { t } = useTranslation();
  const [deleteCategory] = useMutation(deletePackCategoryMutation);
  const [deleteGear] = useMutation(deletePackGearMutation);
  return (
    <Fragment>
      <PackCategoryForm
        packId={id}
        onSuccess={() => refetch()}
        isOpen={addingCategory || !!editingCategory}
        categoryId={editingCategory}
        onClose={closeModals}
      />

      <PackAddItemModal
        categoryId={addingItemToCategory}
        categories={categories}
        isOpen={!!addingItemToCategory}
        onSuccess={refetch}
        onClose={closeModals}
      />

      <UpdatePackGearForm
        id={editingItem}
        onSuccess={() => refetch()}
        isOpen={!!editingItem}
        onClose={closeModals}
      />

      <ConfirmModal
        isOpen={!!deletingCategory}
        onClose={closeModals}
        title={t("DeleteCategoryConfirm", "Delete this category?")}
        description={t(
          "DeleteCategoryConfirmDetail",
          "Are you sure you want to delete this category? All of the items inside the category will be deleted as well."
        )}
        onConfirm={async () => {
          if (deletingCategory) {
            await deleteCategory({ id: deletingCategory });
            refetch();
          }
        }}
      />

      <ConfirmModal
        isOpen={!!deletingItem}
        onClose={closeModals}
        title={t("DeleteGearConfirm", "Delete this gear?")}
        description={t(
          "DeleteGearConfirmDetail",
          "Are you sure you want to delete this gear?"
        )}
        onConfirm={async () => {
          if (deletingItem) {
            await deleteGear({ id: deletingItem });
            refetch();
          }
        }}
      />
    </Fragment>
  );
};

export default PackOrganizerModals;
