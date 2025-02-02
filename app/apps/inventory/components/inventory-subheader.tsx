import type { FC } from "react";
import type { CategoryType } from "db";

import { useState } from "react";
import { invalidateQuery, useMutation, useRouter } from "blitz";

import { useTranslation } from "react-i18next";
import { Heading, HStack, Flex } from "@chakra-ui/layout";
import { MenuItem, MenuList } from "@chakra-ui/menu";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { FcList, FcPackage, FcRating, FcTimeline } from "react-icons/fc";
import { useToast } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";

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
  const { t } = useTranslation();
  const router = useRouter();
  const title =
    type === "INVENTORY"
      ? t("Inventory", "Inventory")
      : type === "WISH_LIST"
      ? t("WishList", "Wish list")
      : t("Archive", "Archive");
  const icon =
    type === "INVENTORY" ? FcList : type === "WISH_LIST" ? FcRating : FcPackage;

  const toast = useToast();
  const [importing, setImporting] = useState(false);

  const [exportCsv] = useMutation(inventoryCsvMutation);

  const exportToCsv = async () => {
    const csv = await exportCsv({ type });
    downloadCsv(type.toLowerCase(), csv);
  };
  const username = router.query.username;
  if (typeof username == "string") {
    var typename = t("UsersList", "{{username}}'s {{title}}", {
      username: username.charAt(0).toUpperCase() + username.slice(1),
      title: title.toLowerCase(),
    });
    typename = typename.charAt(0).toUpperCase() + typename.slice(1);
    return (
      <Subheader>
        <Flex>
          <Icon as={FcTimeline} w={5} h={5} />
          <Heading size="sm" noOfLines={1}>
            {typename}
          </Heading>
        </Flex>
      </Subheader>
    );
  }
  return (
    <Subheader>
      <ImportInventoryCsvForm
        type={type}
        isOpen={importing}
        onClose={() => setImporting(false)}
        onSuccess={() => {
          invalidateQuery(inventoryQuery);
          toast({
            title: t("ImportInventorySuccess", "Your gear has been imported"),
            description: t(
              "ImportInventorySuccessDetail",
              "Your new gear has been imported, you'll find it at the end of your inventory."
            ),
            status: "success",
          });
        }}
      />

      <HStack justifyContent="space-between">
        <PackPicker title={title} icon={icon} />

        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<FaFileExport />} onClick={exportToCsv}>
              {t("ExportCSV", "Export CSV")}
            </MenuItem>
            <MenuItem
              icon={<FaFileImport />}
              onClick={() => setImporting(true)}
            >
              {t("ImportCSV", "Import CSV")}
            </MenuItem>
          </MenuList>
        </SettingsMenuButton>
      </HStack>
    </Subheader>
  );
};

export default InventorySubheader;
