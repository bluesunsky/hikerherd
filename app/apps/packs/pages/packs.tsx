import type { BlitzPage } from "blitz";

import { useMutation, useRouter, Routes, useQuery } from "blitz";
import { Fragment, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, IconButton } from "@chakra-ui/button";
import { Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { MdDelete } from "react-icons/md";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import { useColorModeValue } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import SidebarLayout from "app/layouts/sidebar-layout";
import ConfirmModal from "app/components/confirm-modal";

import packsQuery from "../queries/packs-query";
import PackForm from "../components/pack-form";
import deletePackMutation from "../mutations/delete-pack-mutation";
import PackCard from "../components/pack-card";

const PacksPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const [addingNewPack, setAddingNewPack] = useState(false);
  const [deletingPack, setDeletingPack] = useState<string | null>(null);

  const buttonBorder = useColorModeValue("gray.300", "gray.600");
  const emptyBg = useColorModeValue("gray.200", "gray.700");

  const [packs, { refetch }] = useQuery(packsQuery, {});
  const [deletePack] = useMutation(deletePackMutation, {
    onError() {
      setDeletingPack(null);
      toast({
        title: t("DeletePackError", "There was an error deleting the pack"),
        status: "error",
      });
    },
  });

  return (
    <SidebarLayout>
      <Fragment>
        <Heading size="md" mb={6}>
          {t("Packs", "Packs")}
        </Heading>

        {packs.length === 0 && (
          <Stack
            align="center"
            p={6}
            borderRadius="md"
            spacing={6}
            bg={emptyBg}
          >
            <Text size="md" opacity="0.4">
              {t("NoPacksError", "You have not created any packs yet")}
            </Text>

            <Button
              onClick={() => setAddingNewPack(true)}
              leftIcon={<FaPlus />}
              colorScheme="green"
            >
              {t("CreateFirstPack", "Create my first pack")}
            </Button>
          </Stack>
        )}

        <PackForm
          isOpen={addingNewPack}
          onClose={() => setAddingNewPack(false)}
          onSuccess={(pack) => {
            router.push(Routes.PackPage({ packId: pack.id }));
          }}
        />

        {packs.length > 0 && (
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mt={2}>
            {packs.map((pack) => (
              <PackCard
                key={pack.id}
                pack={pack}
                actions={
                  <Tooltip label={t("DeletePack", "Delete this pack")}>
                    <IconButton
                      size="sm"
                      icon={<MdDelete />}
                      aria-label="Delete"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => setDeletingPack(pack.id)}
                    />
                  </Tooltip>
                }
              />
            ))}

            <Button
              onClick={() => setAddingNewPack(true)}
              h="100%"
              minH={28}
              variant="outline"
              leftIcon={<FaPlus />}
              borderStyle="dashed"
              colorScheme="blackAlpha"
              color="green.400"
              borderColor={buttonBorder}
            >
              {t("CreatePack", "Create new pack")}
            </Button>
          </SimpleGrid>
        )}

        <ConfirmModal
          isOpen={!!deletingPack}
          onClose={() => setDeletingPack(null)}
          title={t("DeletePackConfirm", "Delete pack")}
          description={t(
            "DeletePackConfirmDetail",
            "Are you sure? This will also delete the categories and gear inside of the pack."
          )}
          onConfirm={async () => {
            if (deletingPack) {
              await deletePack({ id: deletingPack });
              refetch();
              toast({
                title: t("DeletePackSuccess", "The pack was deleted"),
                description: t(
                  "DeletePackSuccessDetail",
                  "Your pack was deleted along with the categories and gear inside."
                ),
                status: "success",
              });
            }
          }}
        />
      </Fragment>
    </SidebarLayout>
  );
};

PacksPage.authenticate = { redirectTo: Routes.LoginPage() };

export default PacksPage;
