import type { Currency } from "db";

import { createContext } from "react";

type CategoryItems = {
  category: {
    name: string;
    type: string;
  };
};

export type DragAndDropItem = {
  id: string;
  worn?: boolean;
  ready?: boolean;
  quantity: number;
  notes?: string | null;
  gear: {
    id: string;
    name: string;
    manufacturer: string | null;
    kind: string | null;
    weight: number;
    price: number | null;
    currency: Currency;
    consumable: boolean;
    replaceable: boolean;
    private: boolean;
    location: string | null;
    link: string | null;
    notes: string | null;
    imageUrl: string | null;
    categoryItems?: CategoryItems[];
    purchaseDate: Date | null;
  };
};

type DragAndDropCategory = {
  id: string;
  name: string;
  items: DragAndDropItem[];
};

export type DragAndDropState = DragAndDropCategory[];

export type DragAndDropContext = {
  readonly?: boolean;
  hideCategoryTotals?: boolean;
  state: DragAndDropState;
  username?: String | String[];
  addCategory?: () => void;
  addItemToCategory?: (categoryId: string) => void;
  editCategory?: (id: string) => void;

  categoryMenu?: (item: DragAndDropState[number]) => JSX.Element;
  itemMenu?: (item: DragAndDropState[number]["items"][number]) => JSX.Element;
  editItem?: (id: string) => void;
};

const dragAndDropContext = createContext<DragAndDropContext>(
  {} as DragAndDropContext
);

export default dragAndDropContext;
