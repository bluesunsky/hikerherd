import type { FC } from "react";

import { useState, Fragment, useContext } from "react";
import { invalidateQuery, useMutation } from "blitz";

import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { useToast } from "@chakra-ui/toast";
import { MenuItem, MenuList, MenuDivider } from "@chakra-ui/menu";
import {
  FaEdit,
  FaFileExport,
  FaFileImport,
  FaShare,
  FaHamburger,
  FaTshirt,
  FaWeightHanging,
} from "react-icons/fa";
import { FcDoughnutChart } from "react-icons/fc";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";

import SettingsMenuButton from "app/components/settings-menu-button";
import downloadCsv from "app/helpers/download-csv";
import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";
import displayWeight from "app/helpers/display-weight";

import packShareLink from "../helpers/pack-share-link";
import packContext from "../contexts/pack-context";
import packExportCsvMutation from "../mutations/pack-export-csv-mutation";
import packOrganizerQuery from "../queries/pack-organizer-query";

import ImportPackCsvForm from "./import-pack-csv-form";

const PackSubheaderActions: FC = () => {
  const toast = useToast();
  const [importing, setImporting] = useState(false);
  const { baseWeight } = useContext(packContext);
  const { packWeight } = useContext(packContext);
  const { totalWeight } = useContext(packContext);
  const { weightUnit } = useContext(userPreferencesContext);

  const { pack, showDetails, editPack, share } = useContext(packContext);

  const copyShareLink = () => {
    navigator.clipboard.writeText(packShareLink(pack.id)).then(() => {
      toast({
        title: "Share link copied.",
        description:
          "A share link for your pack has been copied to your clipboard.",
        status: "success",
      });
    });
  };

  const [exportCsv] = useMutation(packExportCsvMutation);

  const exportToCsv = async () => {
    const csv = await exportCsv({ id: pack.id });
    downloadCsv(pack.name || "pack", csv);
  };

  return (
    <Fragment>
      <ImportPackCsvForm
        packId={pack.id}
        isOpen={importing}
        onClose={() => setImporting(false)}
        onSuccess={() => {
          invalidateQuery(packOrganizerQuery);
          toast({
            title: "Your gear has been imported",
            status: "success",
          });
        }}
      />

      <HStack>
        {!share && (
          <SettingsMenuButton>
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={editPack}>
                Edit
              </MenuItem>
              <MenuItem
                icon={<FaShare />}
                command={pack.private ? "private" : ""}
                onClick={copyShareLink}
                isDisabled={pack.private}
              >
                Share
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<FaFileExport />} onClick={exportToCsv}>
                Export CSV
              </MenuItem>
              <MenuItem
                icon={<FaFileImport />}
                onClick={() => setImporting(true)}
              >
                Import CSV
              </MenuItem>
            </MenuList>
          </SettingsMenuButton>
        )}

        <Button
          size="sm"
          leftIcon={<Icon w={5} h={5} as={FcDoughnutChart} />}
          fontWeight="bold"
          variant="outline"
          colorScheme="blue"
          onClick={showDetails}
        >
          <Tooltip label="Bag weight">
            <Tag size="sm">
              <TagLabel>{displayWeight(packWeight, weightUnit, true)}</TagLabel>
            </Tag>
          </Tooltip>
          <Tag colorScheme="white" size="sm">
            <TagLabel>(</TagLabel>
          </Tag>
          <Tooltip label="Base weight">
            <Tag colorScheme="teal" size="sm">
              <TagLeftIcon as={FaWeightHanging} />
              <TagLabel>{displayWeight(baseWeight, weightUnit, true)}</TagLabel>
            </Tag>
          </Tooltip>
          <Tag colorScheme="white" size="sm">
            <TagLabel> + </TagLabel>
          </Tag>
          <Tooltip label="Consumable weight">
            <Tag colorScheme="pink" size="sm">
              <TagLeftIcon as={FaHamburger} />
              <TagLabel>
                {displayWeight(packWeight - baseWeight, weightUnit, true)}
              </TagLabel>
            </Tag>
          </Tooltip>
          <Tag colorScheme="white" size="sm">
            <TagLabel> ) + </TagLabel>
          </Tag>
          <Tooltip label="Weight on oneselft">
            <Tag colorScheme="blue" size="sm">
              <TagLeftIcon as={FaTshirt} />
              <TagLabel>
                {displayWeight(totalWeight - packWeight, weightUnit, true)}
              </TagLabel>
            </Tag>
          </Tooltip>
        </Button>
      </HStack>
    </Fragment>
  );
};

export default PackSubheaderActions;
