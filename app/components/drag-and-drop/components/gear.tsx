import type { BlitzPage } from "blitz";
import type { DragAndDropState } from "../contexts/gear-dnd-context";
import type { DraggableProvided } from "react-beautiful-dnd";

import { useContext, useMemo } from "react";

import { Box } from "@chakra-ui/layout";

import GearCard from "app/apps/gear/components/gear-card/components/gear-card";

import dragAndDropContext from "../contexts/gear-dnd-context";

type GearProps = {
  item: DragAndDropState[number]["items"][number];
  isDragging: boolean;
  provided: DraggableProvided;
};

const Gear: BlitzPage<GearProps> = ({ item, isDragging, provided }) => {
  const { itemMenu, editItem } = useContext(dragAndDropContext);

  const menu = useMemo(() => {
    return itemMenu && itemMenu(item);
  }, [item]); //eslint-disable-line
  const list =
    item.gear.categoryItems && item.gear.categoryItems.length > 0
      ? item.gear.categoryItems[0]?.category.type
      : null;

  return (
    <Box
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      key={item.id}
      style={provided.draggableProps.style}
      userSelect="none"
      py={1}
    >
      <GearCard
        name={item.gear.name}
        manufacturer={item.gear.manufacturer}
        kind={item.gear.kind}
        weight={item.gear.weight}
        price={item.gear.price}
        currency={item.gear.currency}
        worn={item.worn}
        consumable={item.gear.consumable}
        replaceable={item.gear.replaceable}
        isprivate={item.gear.private}
        link={item.gear.link}
        notes={item.notes || item.gear.notes}
        list={list}
        dragging={isDragging}
        quantity={item.quantity}
        menu={menu}
        imageUrl={item.gear.imageUrl}
        onHeadingClick={editItem && (() => editItem(item.id))}
        purchaseDate={item.gear.purchaseDate}
      />
    </Box>
  );
};

export default Gear;
