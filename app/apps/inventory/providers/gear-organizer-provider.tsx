import type { FC } from "react";
import type { DragAndDropState } from "app/components/drag-and-drop/contexts/gear-dnd-context";

import { useState } from "react";

import gearOrganizerContext from "../contexts/gear-organizer-context";

const { Provider } = gearOrganizerContext;

type Id = string | null;

type GearOrganizerProviderProps = {
  state: DragAndDropState;
  setState: (update: (state: DragAndDropState) => DragAndDropState) => void;
  refetch: () => void;
};

const GearOrganizerProvider: FC<GearOrganizerProviderProps> = ({
  state,
  setState,
  refetch,
  children,
}) => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Id>(null);
  const [deletingCategory, setDeletingCategory] = useState<Id>(null);

  const [addingItemToCategory, setAddingItemToCategory] = useState<Id>(null);
  const [editingItem, setEditingItem] = useState<Id>(null);
  const [deletingItem, setDeletingItem] = useState<Id>(null);

  const [togglingMetaItem, setTogglingMetaItem] = useState<Id>(null);

  const [movingToInventory, moveToInventory] = useState<Id>(null);

  const [movingToWishList, moveToWishList] = useState<Id>(null);

  const [movingToArchive, moveToArchive] = useState<Id>(null);

  const closeModals = () => {
    setAddingCategory(false);
    setEditingCategory(null);
    setDeletingCategory(null);
    setEditingItem(null);
    setDeletingItem(null);
    setTogglingMetaItem(null);
    setAddingItemToCategory(null);
    moveToInventory(null);
    moveToArchive(null);
    moveToWishList(null);
  };

  return (
    <Provider
      value={{
        state,
        setState,
        refetch,

        closeModals,

        addingCategory,
        addCategory: () => setAddingCategory(true),

        editingCategory,
        editCategory: (id: string) => setEditingCategory(id),

        deletingCategory,
        deleteCategory: (id: string) => setDeletingCategory(id),

        editingItem,
        editItem: (id: string) => setEditingItem(id),

        addingItemToCategory,
        addItemToCategory: (id: string) => setAddingItemToCategory(id),

        deletingItem,
        deleteItem: (id: string) => setDeletingItem(id),

        togglingMetaItem,
        toggleMetaItem: (id: string) => setTogglingMetaItem(id),

        movingToInventory,
        toInventory: (id: string) => moveToInventory(id),

        movingToWishList,
        toWishList: (id: string) => moveToWishList(id),

        movingToArchive,
        toArchive: (id: string) => moveToArchive(id),
      }}
    >
      {children}
    </Provider>
  );
};

export default GearOrganizerProvider;
