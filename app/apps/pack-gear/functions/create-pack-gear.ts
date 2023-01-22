import type { TransactionFunction } from "app/types/transaction-function";
import type { CategoryItem, Currency } from "db";

type Params = {
  categoryId: string;
  index: number;
  values: {
    name: string;
    manufacturer: string | null;
    kind: string | null;
    weight: number;
    imageUrl: string | null;
    location: string | null;
    link: string | null;
    notes?: string | null;
    consumable: boolean;
    replaceable: boolean;
    private: boolean;
    price: number | null;
    currency: Currency;
    worn: boolean;
    ready: boolean;
    quantity?: number;
    purchaseDate: Date | null;
  };
};

const createPackGear: TransactionFunction<Params, CategoryItem> = async (
  transaction,
  ctx,
  { categoryId, index, values }
) => {
  return transaction.packCategoryItem.create({
    data: {
      index,
      worn: values.worn,
      ready: values.ready,
      quantity: values.quantity,
      notes: values.notes,

      category: {
        connect: {
          id: categoryId,
        },
      },

      gear: {
        create: {
          name: values.name,
          manufacturer: values.manufacturer,
          kind: values.kind,
          weight: values.weight,
          imageUrl: values.imageUrl,
          location: values.location,
          link: values.link,
          notes: values.notes,
          consumable: values.consumable,
          replaceable: values.replaceable,
          private: values.private,
          price: values.price,
          currency: values.currency,
          userId: ctx.session.userId,
          purchaseDate: values.purchaseDate,
        },
      },
    },
  });
};

export default createPackGear;
