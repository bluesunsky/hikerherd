import type { FC } from "react";

import { memo } from "react";

import { useTranslation } from "react-i18next";
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
import { MdLocationOn } from "react-icons/md";

import Popover from "app/components/popover";

type GearCardTagsProps = {
  consumable?: boolean;
  replaceable?: boolean;
  location?: string | null;
  link?: string | null;
  notes?: string | null;
  list?: string | null;
  isprivate?: boolean;
};

const GearCardTags: FC<GearCardTagsProps> = memo(
  ({ link, consumable, replaceable, notes, location, list, isprivate }) => {
    const { t } = useTranslation();
    return (
      <Wrap>
        {link && (
          <Tooltip label={t("Link", "Link")}>
            <Link href={link} isExternal display="inline-flex">
              <Tag size="sm" borderRadius="md">
                <Icon as={FaLink} />
              </Tag>
            </Link>
          </Tooltip>
        )}

        {consumable && (
          <Tooltip label={t("Consumable", "Consumable")}>
            <Tag colorScheme="pink" size="sm" borderRadius="md">
              <Icon as={FaHamburger} />
            </Tag>
          </Tooltip>
        )}
        {(replaceable || list == "WISH_LIST" || list == "ARCHIVE") && (
          <Popover
            trigger={
              <Tag bg="red" color="white" size="sm" borderRadius="md">
                <Icon as={FaExclamationTriangle} />
              </Tag>
            }
          >
            {replaceable && (
              <>
                {t("ToReplace", "To Replace!")}
                <br />
              </>
            )}
            {list == "WISH_LIST" && (
              <>
                {t("NotOwned", "Not owned!")}
                <br />
              </>
            )}
            {list == "ARCHIVE" && (
              <>
                {t("OldGear", "Old gear!")}
                <br />
              </>
            )}
          </Popover>
        )}
        {notes && (
          <Popover
            trigger={
              <Tag colorScheme="yellow" size="sm" borderRadius="md">
                <Icon as={FaRegStickyNote} />
              </Tag>
            }
          >
            {notes}
          </Popover>
        )}

        {location && (
          <Tooltip label={location}>
            <Tag bg="#ebccac" size="sm" borderRadius="md">
              <Icon as={MdLocationOn} />
            </Tag>
          </Tooltip>
        )}

        {isprivate && (
          <Tooltip label={t("Private", "Private")}>
            <Tag bg="black" color="white" size="sm" borderRadius="md">
              <Icon as={FaLock} />
            </Tag>
          </Tooltip>
        )}
      </Wrap>
    );
  }
);

export default GearCardTags;
