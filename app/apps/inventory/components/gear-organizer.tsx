import type { FC } from "react";
import type { CategoryType } from "db";
import type { DragAndDropState } from "app/components/drag-and-drop/contexts/gear-dnd-context";

import { useEffect, useState } from "react";
import { useQuery } from "blitz";

import GearOrganizerProvider from "../providers/gear-organizer-provider";
import inventoryQuery from "../queries/inventory-query";

import GearOrganizerModals from "./gear-organizer-modals";
import GearOrganizerDragAndDrop from "./gear-organizer-drag-and-drop";

type GearOrganizerProps = {
  type: CategoryType;
  username?: string | null;
};

const GearOrganizer: FC<GearOrganizerProps> = ({ type, username }) => {
  const [data, { refetch }] = useQuery(inventoryQuery, { type, username });
  const [state, setState] = useState<DragAndDropState>(data);

  useEffect(() => {
    setState(data);
  }, [data]);
  if (username)
    return (
      <GearOrganizerProvider
        state={state}
        setState={setState}
        refetch={refetch}
      >
        <GearOrganizerDragAndDrop type={type} username={username} />
      </GearOrganizerProvider>
    );
  return (
    <GearOrganizerProvider state={state} setState={setState} refetch={refetch}>
      <GearOrganizerModals type={type} />
      <GearOrganizerDragAndDrop type={type} />
    </GearOrganizerProvider>
  );
};

export default GearOrganizer;
