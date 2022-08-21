import type { FC } from "react";

import { memo } from "react";

import { Link, Wrap } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Icon } from "@chakra-ui/icon";
import {
  FaLink,
  FaRegStickyNote,
  FaHamburger,
  FaExclamationTriangle,
  FaLock,
} from "react-icons/fa";
import { Tooltip } from "@chakra-ui/tooltip";

import Popover from "app/components/popover";

type GearCardTagsProps = {
  consumable?: boolean;
  replaceable?: boolean;
  link?: string | null;
  notes?: string | null;
  list?: string | null;
  isprivate?: boolean;
};

const GearCardTags: FC<GearCardTagsProps> = memo(
  ({ link, consumable, replaceable, notes, list, isprivate }) => {
    return (
      <Wrap>
        {link && (
          <Tooltip label="Lien">
            <Link href={link} isExternal display="inline-flex">
              <Tag size="sm" borderRadius="full">
                <Icon as={FaLink} />
              </Tag>
            </Link>
          </Tooltip>
        )}

        {consumable && (
          <Tooltip label="Consommable">
            <Tag colorScheme="pink" size="sm" borderRadius="full">
              <Icon as={FaHamburger} />
            </Tag>
          </Tooltip>
        )}
        {(replaceable || list == "WISH_LIST") && (
          <Popover
            trigger={
              <Tag bg="red" color="white" size="sm" borderRadius="full">
                <Icon as={FaExclamationTriangle} />
              </Tag>
            }
          >
            {replaceable && (
              <>
                A remplacer ! <br />
              </>
            )}
            {list == "WISH_LIST" && (
              <>
                Non possédé <br />
              </>
            )}
          </Popover>
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

        {isprivate && (
          <Tooltip label="Privé">
            <Tag bg="black" color="white" size="sm" borderRadius="full">
              <Icon as={FaLock} />
            </Tag>
          </Tooltip>
        )}
      </Wrap>
    );
  }
);

export default GearCardTags;
