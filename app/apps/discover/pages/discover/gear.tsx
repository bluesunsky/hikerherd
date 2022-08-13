import type { BlitzPage } from "blitz";
import type { CategoryType, Gear } from "db";

import { useSession } from "blitz";
import { Fragment, useState } from "react";

import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { Heading, HStack, Text } from "@chakra-ui/layout";
import { FcList, FcRating } from "react-icons/fc";
import { useColorModeValue } from "@chakra-ui/react";

import SidebarLayout from "app/layouts/sidebar-layout";
import Card from "app/components/card";

import AddToInventoryForm from "../../components/add-to-inventory-form";
import GlobalGearSearch from "../../components/global-gear-search";

const DiscoverGearPage: BlitzPage = () => {
  const session = useSession({ suspense: false });
  const toast = useToast();
  const textColor = useColorModeValue("gray.600", "gray.400");

  const [adding, setAdding] = useState<{
    type: CategoryType;
    gear: Gear;
  } | null>(null);

  return (
    <Fragment>
      <AddToInventoryForm
        isOpen={!!adding}
        onClose={() => setAdding(null)}
        gear={adding?.gear}
        type={adding?.type}
        onSuccess={() => {
          setAdding(null);
          toast({
            title: "Succès",
            description: "L'équipement a été ajouté.",
            status: "success",
          });
        }}
      />

      <Heading mb={4} size="md">
        Equipements partagés
      </Heading>

      <Text mb={2} color={textColor}>
        Chaque fois que de nouveaux équipements sont ajoutés, ils peuvent être
        trouvés ici.
      </Text>
      <Text mb={5} color={textColor}>
        Les données sur l&lsquo;équipement sont collectées par{" "}
        <strong>vous</strong>, donc plus vous utilisez application, plus il
        s&lsquo;améliorera !
      </Text>

      <Card>
        <GlobalGearSearch
          gearActions={(gear) => (
            <Fragment>
              {session.userId && (
                <HStack spacing={2}>
                  <Button
                    isFullWidth
                    size="sm"
                    leftIcon={<FcList />}
                    onClick={() => setAdding({ type: "INVENTORY", gear })}
                  >
                    Ajouter à l&lsquo;inventaire
                  </Button>
                  <Button
                    isFullWidth
                    size="sm"
                    leftIcon={<FcRating />}
                    onClick={() => setAdding({ type: "WISH_LIST", gear })}
                  >
                    Ajouter aux souhaits
                  </Button>
                </HStack>
              )}
            </Fragment>
          )}
        />
      </Card>
    </Fragment>
  );
};

DiscoverGearPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DiscoverGearPage;
