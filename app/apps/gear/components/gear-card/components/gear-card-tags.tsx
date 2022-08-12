import type { FC } from "react";

import { memo } from "react";

import { Link, Wrap } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Icon } from "@chakra-ui/icon";
import { FaLink, FaRegStickyNote, FaHamburger } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/tooltip";

import Popover from "app/components/popover";

type GearCardTagsProps = {
  consumable?: boolean;
  link?: string | null;
  notes?: string | null;
};

const GearCardTags: FC<GearCardTagsProps> = memo(
  ({ link, consumable, notes }) => {
    return (
      <Wrap>
        {link && (
          <Tooltip label="link">
            <Link href={link} isExternal display="inline-flex">
              <Tag size="sm" borderRadius="full">
                <Icon as={FaLink} />
              </Tag>
            </Link>
          </Tooltip>
        )}

        {consumable && (
          <Tooltip label="consumable">
            <Tag colorScheme="pink" size="sm" borderRadius="full">
              <Icon as={FaHamburger} />
            </Tag>
          </Tooltip>
        )}

        {notes && (
          <Popover
            trigger={
              <Tag colorScheme="yellow" size="sm" borderRadius="full">
                <Icon as={FaRegStickyNote} />
              </Tag>
            }
          >
            {notes}
          </Popover>
        )}
      </Wrap>
    );
  }
);

export default GearCardTags;
