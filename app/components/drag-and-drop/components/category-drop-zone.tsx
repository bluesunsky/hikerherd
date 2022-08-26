import type { FC } from "react";

import { useContext } from "react";

import { useTranslation } from "react-i18next";
import { Box, HStack } from "@chakra-ui/layout";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/react";

import useCalculatePackTotals from "app/apps/packs/hooks/use-calculate-pack-totals";

import dragAndDropContext from "../contexts/gear-dnd-context";

import DraggableCategory from "./draggable-category";
import HorizontalScroller from "./horizontal-scroller";

const CategoryDropZone: FC = () => {
  const { addCategory, state, readonly, username } =
    useContext(dragAndDropContext);
  const { t } = useTranslation();
  const { categories } = useCalculatePackTotals(state);

  const dragColor = useColorModeValue("blue.200", "blue.700");
  return (
    <HorizontalScroller>
      <Droppable
        droppableId="category"
        type="category"
        isDropDisabled={readonly}
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            bg={snapshot.isDraggingOver ? dragColor : ""}
            height="100%"
            flex="1 0 auto"
          >
            <HStack
              spacing={0}
              alignItems="flex-start"
              width="100%"
              height="100%"
              px={1}
              py={2}
            >
              {categories.map((category, index) => (
                <DraggableCategory
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}

              {provided.placeholder}

              {!username && addCategory && (
                <Box
                  width="290px"
                  flex="0 0 290px"
                  padding={2}
                  borderRadius="md"
                  mx={1}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Button
                    isFullWidth
                    size="sm"
                    colorScheme="blue"
                    onClick={addCategory}
                    width="400px"
                    maxWidth="calc(100vw - 10px)"
                  >
                    {t("NewCategory", "New category")}
                  </Button>
                </Box>
              )}
            </HStack>
          </Box>
        )}
      </Droppable>
    </HorizontalScroller>
  );
};

export default CategoryDropZone;
