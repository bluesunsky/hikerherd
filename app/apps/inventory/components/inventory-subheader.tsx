import type { FC } from "react";
import type { CategoryType } from "db";

import { useState } from "react";
import { invalidateQuery, useMutation } from "blitz";

import { HStack } from "@chakra-ui/layout";
import { MenuItem, MenuList } from "@chakra-ui/menu";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { FcList, FcRating } from "react-icons/fc";
import { useToast } from "@chakra-ui/react";

import PackPicker from "app/apps/packs/components/pack-picker";
import Subheader from "app/components/subheader";
import SettingsMenuButton from "app/components/settings-menu-button";
import downloadCsv from "app/helpers/download-csv";

import inventoryCsvMutation from "../mutations/inventory-export-csv-mutation";
import inventoryQuery from "../queries/inventory-query";

import ImportInventoryCsvForm from "./import-inventory-csv-form";

type InventorySubheaderProps = {
  type: CategoryType;
};

const InventorySubheader: FC<InventorySubheaderProps> = ({ type }) => {
  const title = type === "INVENTORY" ? "Inventaire" : "Souhaits";
  const icon = type === "INVENTORY" ? FcList : FcRating;

  const toast = useToast();
  const [importing, setImporting] = useState(false);

  const [exportCsv] = useMutation(inventoryCsvMutation);

  const exportToCsv = async () => {
    const csv = await exportCsv({ type });
    downloadCsv(type.toLowerCase(), csv);
  };

  return (
    <Subheader>
      <ImportInventoryCsvForm
        type={type}
        isOpen={importing}
        onClose={() => setImporting(false)}
        onSuccess={() => {
          invalidateQuery(inventoryQuery);
          toast({
            title: "Votre inventaire a été importé",
            description:
              "Votre nouvel équipement a été importé, vous le trouverez à la fin de votre inventaire.",
            status: "success",
          });
        }}
      />

      <HStack justifyContent="space-between">
        <PackPicker title={title} icon={icon} />

        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<FaFileExport />} onClick={exportToCsv}>
              Exporter vers un CSV
            </MenuItem>
            <MenuItem
              icon={<FaFileImport />}
              onClick={() => setImporting(true)}
            >
              Importer depuis un CSV
            </MenuItem>
          </MenuList>
        </SettingsMenuButton>
      </HStack>
    </Subheader>
  );
};

export default InventorySubheader;
