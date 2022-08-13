import type { BlitzPage } from "blitz";
import type { DragAndDropState } from "../contexts/gear-dnd-context";
import type { DraggableProvided } from "react-beautiful-dnd";

import { useContext, useMemo } from "react";

import { Button, IconButton } from "@chakra-ui/button";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";
import { HStack, Heading, Box, Flex } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { Menu, MenuButton } from "@chakra-ui/menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/tooltip";
import { FaHamburger, FaTshirt, FaWeightHanging } from "react-icons/fa";

import displayWeight from "app/helpers/display-weight";
import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import displayCurrency from "app/helpers/display-currency";

import dragAndDropContext from "../contexts/gear-dnd-context";

import GearDropZone from "./gear-drop-zone";
type CategoryProps = {
  category: DragAndDropState[number] & {
    weight: number;
    eur: number;
    usd: number;
    gbp: number;
    consumableWeight: number;
    wornWeight: number;
    baseWeight: number;
  };
  provided: DraggableProvided;
  isDragging: boolean;
};

const Category: BlitzPage<CategoryProps> = ({
  category,
  isDragging,
  provided,
}) => {
  const { categoryMenu, addItemToCategory, editCategory, hideCategoryTotals } =
    useContext(dragAndDropContext);
  const { weightUnit } = useContext(userPreferencesContext);

  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const borderWidth = useColorModeValue("2px", "1px");

  const menu = useMemo(() => {
    return categoryMenu && categoryMenu(category);
  }, [category]); // eslint-disable-line

  return (
    <Flex
      {...provided.draggableProps}
      key={category.id}
      ref={provided.innerRef}
      style={provided.draggableProps.style}
      userSelect="none"
      pointerEvents="all"
      px={2}
      pb={2}
      borderStyle="solid"
      borderWidth={borderWidth}
      bg={bg}
      borderColor={isDragging ? "blue.400" : borderColor}
      borderRadius="md"
      mx={1}
      width="400px"
      maxW="calc(100vw - 21px);"
      maxH="calc(100vh - 140px);"
      direction="column"
    >
      <HStack
        {...provided.dragHandleProps}
        align="center"
        justify="space-between"
        px={1}
        py={3}
        pb={2}
      >
        <Heading
          size="sm"
          cursor={editCategory && "pointer"}
          onClick={editCategory && (() => editCategory(category.id))}
          noOfLines={2}
        >
          {category.name}
        </Heading>

        <HStack>
          {!hideCategoryTotals && category.baseWeight && (
            <Tooltip label="Base weight">
              <Tag colorScheme="teal" size="sm">
                <TagLeftIcon as={FaWeightHanging} />
                <TagLabel>
                  {displayWeight(category.baseWeight, weightUnit, true)}
                </TagLabel>
              </Tag>
            </Tooltip>
          )}
          {!hideCategoryTotals && category.consumableWeight && (
            <Tooltip label="Consumable weight">
              <Tag colorScheme="pink" size="sm">
                <TagLeftIcon as={FaHamburger} />
                <TagLabel>
                  {displayWeight(category.consumableWeight, weightUnit, true)}
                </TagLabel>
              </Tag>
            </Tooltip>
          )}
          {!hideCategoryTotals && category.wornWeight && (
            <Tooltip label="Weight on oneself">
              <Tag colorScheme="blue" size="sm">
                <TagLeftIcon as={FaTshirt} />
                <TagLabel>
                  {displayWeight(category.wornWeight, weightUnit, true)}
                </TagLabel>
              </Tag>
            </Tooltip>
          )}

          {!hideCategoryTotals && category.eur && (
            <Tooltip label="Euros price share (€)">
              <Tag colorScheme="purple" size="sm">
                <TagLabel>
                  {Number(category.eur) / 100}
                  {displayCurrency("EUR")}
                </TagLabel>
              </Tag>
            </Tooltip>
          )}
          {!hideCategoryTotals && category.usd && (
            <Tooltip label="Dollars price share ($)">
              <Tag colorScheme="purple" size="sm">
                <TagLabel>
                  {Number(category.usd) / 100}
                  {displayCurrency("USD")}
                </TagLabel>
              </Tag>
            </Tooltip>
          )}
          {!hideCategoryTotals && category.gbp && (
            <Tooltip label="Pounds price share (£)">
              <Tag colorScheme="purple" size="sm">
                <TagLabel>
                  {Number(category.gbp) / 100}
                  {displayCurrency("GBP")}
                </TagLabel>
              </Tag>
            </Tooltip>
          )}
          {categoryMenu && (
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                borderRadius="full"
                icon={<BsThreeDotsVertical />}
                size="xs"
                aria-label="actions"
              />
              {menu}
            </Menu>
          )}
        </HStack>
      </HStack>

      <GearDropZone droppableId={category.id} items={category.items} />

      {addItemToCategory && (
        <Box p={1}>
          <Button
            isFullWidth
            size="sm"
            onClick={() => addItemToCategory(category.id)}
            colorScheme="blue"
          >
            Add
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Category;
