import type { TransactionFunction } from "app/types/transaction-function";
import type { CategoryItem, Currency } from "db";

type Params = {
  categoryId: string;
  index: number;
  values: {
    name: string;
    weight: number;
    imageUrl: string | null;
    link: string | null;
    notes: string | null;
    consumable: boolean;
    replaceable: boolean;
    price: number | null;
    currency: Currency;
    purchaseDate: Date | null;
  };
};

const createCategoryGear: TransactionFunction<Params, CategoryItem> = async (
  transaction,
  ctx,
  { categoryId, index, values }
) => {
  return transaction.categoryItem.create({
    data: {
      index,

      category: {
        connect: {
          id: categoryId,
        },
      },

      gear: {
        create: {
          name: values.name,
          weight: values.weight,
          imageUrl: values.imageUrl,
          link: values.link,
          notes: values.notes,
          consumable: values.consumable,
          replaceable: values.replaceable,
          price: values.price,
          currency: values.currency,
          userId: ctx.session.userId,
          purchaseDate: values.purchaseDate,
        },
      },
    },
  });
};

export default createCategoryGear;
