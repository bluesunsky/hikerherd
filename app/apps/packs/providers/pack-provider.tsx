import type { FC } from "react";

import { useQuery } from "blitz";
import { useState } from "react";

import packContext from "../contexts/pack-context";
import useCalculatePackTotals from "../hooks/use-calculate-pack-totals";
import packOrganizerQuery from "../queries/pack-organizer-query";
import PackForm from "../components/pack-form";
import PackDetails from "../components/pack-details";
import packQuery from "../queries/pack-query";

const { Provider } = packContext;

type PackProviderProps = {
  id: string;
  share?: boolean;
};

const PackProvider: FC<PackProviderProps> = ({ id, share, children }) => {
  const [editingPack, setEditingPack] = useState(false);
  const [showingDetails, setShowingDetails] = useState(false);

  const [pack, { refetch: refetchPack }] = useQuery(
    packQuery,
    { id },
    { enabled: !share }
  );

  const [packOrganizer, { refetch: refetchOrganizer }] = useQuery(
    packOrganizerQuery,
    { id }
  );

  const { categories, totalWeight, packWeight, baseWeight, eur, usd, gbp } =
    useCalculatePackTotals(packOrganizer?.categories || []);

  return (
    <Provider
      value={{
        share,

        editPack: () => setEditingPack(true),
        showDetails: () => setShowingDetails(true),

        pack: pack || {
          id,
          notes: packOrganizer.notes,
          name: packOrganizer.name,
          private: packOrganizer.private,
        },

        user: packOrganizer?.user,

        categories,
        totalWeight,
        packWeight,
        baseWeight,
        eur,
        usd,
        gbp,

        refetchOrganizer,
      }}
    >
      {!share && (
        <PackForm
          packId={id}
          isOpen={editingPack}
          onClose={() => setEditingPack(false)}
          onSuccess={() => {
            refetchPack();
            setEditingPack(false);
          }}
        />
      )}

      <PackDetails
        onClose={() => setShowingDetails(false)}
        isOpen={showingDetails}
      />

      {children}
    </Provider>
  );
};

export default PackProvider;
