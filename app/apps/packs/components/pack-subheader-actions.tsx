import type { FC } from "react";

import { useEffect, useState, Fragment, useContext } from "react";
import { invalidateQuery, useMutation, Routes, useSession, Link } from "blitz";

import { useTranslation } from "react-i18next";
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
  FaUserSecret,
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
  const { t } = useTranslation();
  const { pack, showDetails, editPack, share } = useContext(packContext);

  const copyShareLink = () => {
    navigator.clipboard.writeText(packShareLink(pack.id)).then(() => {
      toast({
        title: t("CopyLinkConfirm", "Share link copied."),
        description: t(
          "CopyLinkConfirmDescription",
          "A share link for your pack has been copied to your clipboard."
        ),
        status: "success",
      });
    });
  };

  const useMatchMedia = (mediaQuery: string, initialValue: boolean) => {
    const [isMatching, setIsMatching] = useState(initialValue);
    useEffect(() => {
      const watcher = window.matchMedia(mediaQuery);
      setIsMatching(watcher.matches);
      const listener = (matches: {
        matches: boolean | ((prevState: boolean) => boolean);
      }) => {
        setIsMatching(matches.matches);
      };
      if (watcher.addEventListener) {
        watcher.addEventListener("change", listener);
      } else {
        watcher.addListener(listener);
      }
      return () => {
        if (watcher.removeEventListener) {
          return watcher.removeEventListener("change", listener);
        } else {
          return watcher.removeListener(listener);
        }
      };
    }, [mediaQuery]);

    return isMatching;
  };
  const [exportCsv] = useMutation(packExportCsvMutation);

  const exportToCsv = async () => {
    const csv = await exportCsv({ id: pack.id });
    downloadCsv(pack.name || "pack", csv);
  };
  const size500 = useMatchMedia("(min-width:500px)", true);
  const size768 = useMatchMedia("(min-width:48em)", true);

  const route = share ? Routes.PackPage : Routes.PackSharePage;
  const session = useSession({ suspense: false });
  return (
    <Fragment>
      <ImportPackCsvForm
        packId={pack.id}
        isOpen={importing}
        onClose={() => setImporting(false)}
        onSuccess={() => {
          invalidateQuery(packOrganizerQuery);
          toast({
            title: t("ImportPack", "Your gear has been imported"),
            status: "success",
          });
        }}
      />

      <HStack>
        {!share && (
          <SettingsMenuButton>
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={editPack}>
                {t("Edit", "Edit")}
              </MenuItem>
              <MenuItem
                icon={<FaShare />}
                command={pack.private ? t("Private", "Private") : ""}
                onClick={copyShareLink}
                isDisabled={pack.private}
              >
                {t("Share", "Share")}
              </MenuItem>
              {session.role && session.role !== "USER" && (
                <Link href={route({ packId: pack.id })} passHref>
                  <MenuItem icon={<FaUserSecret />} as="a">
                    {t("SeeSharedPack", "See the shared pack")}
                  </MenuItem>
                </Link>
              )}
              <MenuDivider />
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
        )}
        {share && session.role && session.role !== "USER" && (
          <SettingsMenuButton>
            <MenuList>
              <Link href={route({ packId: pack.id })} passHref>
                <MenuItem icon={<FaUserSecret />} as="a">
                  {t("ModeratePack", "Moderate pack")}
                </MenuItem>
              </Link>
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
          <Tooltip
            label={
              displayWeight(packWeight, weightUnit, true, 2) +
              " " +
              t("PackWeight", "in the packback")
            }
          >
            <Tag size="sm">
              <TagLabel>
                {displayWeight(packWeight, weightUnit, true, 1)}
              </TagLabel>
            </Tag>
          </Tooltip>
          {size768 && (
            <>
              <Tag colorScheme="white" size="sm">
                <TagLabel>(</TagLabel>
              </Tag>
              <Tooltip
                label={
                  displayWeight(baseWeight, weightUnit, true, 2) +
                  " " +
                  t("OfBase", "of base gears")
                }
              >
                <Tag colorScheme="teal" size="sm">
                  <TagLeftIcon as={FaWeightHanging} />
                  <TagLabel>
                    {displayWeight(baseWeight, weightUnit, true, 1)}
                  </TagLabel>
                </Tag>
              </Tooltip>
              <Tag colorScheme="white" size="sm">
                <TagLabel>+</TagLabel>
              </Tag>
              <Tooltip
                label={
                  displayWeight(packWeight - baseWeight, weightUnit, true, 2) +
                  " " +
                  t("OfConsumables", "of consumables")
                }
              >
                <Tag colorScheme="pink" size="sm">
                  <TagLeftIcon as={FaHamburger} />
                  <TagLabel>
                    {displayWeight(
                      packWeight - baseWeight,
                      weightUnit,
                      true,
                      1
                    )}
                  </TagLabel>
                </Tag>
              </Tooltip>
              <Tag colorScheme="white" size="sm">
                <TagLabel>)</TagLabel>
              </Tag>
            </>
          )}
          {size500 && (
            <>
              <Tag colorScheme="white" size="sm">
                <TagLabel>+</TagLabel>
              </Tag>
              <Tooltip
                label={
                  displayWeight(totalWeight - packWeight, weightUnit, true, 2) +
                  " " +
                  t("OnOneself", "On oneself")
                }
              >
                <Tag colorScheme="blue" size="sm">
                  <TagLeftIcon as={FaTshirt} />
                  <TagLabel>
                    {displayWeight(
                      totalWeight - packWeight,
                      weightUnit,
                      true,
                      1
                    )}
                  </TagLabel>
                </Tag>
              </Tooltip>
            </>
          )}
        </Button>
      </HStack>
    </Fragment>
  );
};

export default PackSubheaderActions;
