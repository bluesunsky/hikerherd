import type { BlitzPage } from "blitz";
import type { CategoryType, Gear } from "db";

import { useSession } from "blitz";
import { Fragment, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { Heading, SimpleGrid, Text } from "@chakra-ui/layout";
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
  const { t } = useTranslation();
  const [adding, setAdding] = useState<{
    type: CategoryType;
    gear: Gear;
  } | null>(null);

  return (
    <SidebarLayout>
      <Fragment>
        <AddToInventoryForm
          isOpen={!!adding}
          onClose={() => setAdding(null)}
          gear={adding?.gear}
          type={adding?.type}
          onSuccess={() => {
            setAdding(null);
            toast({
              title: t("Success", "Success"),
              description: t("AddItemSuccess", "The item has been added."),
              status: "success",
            });
          }}
        />

        <Heading mb={4} size="md">
          {t("GearSearch", "Gear search")}
        </Heading>

        <Text
          mb={2}
          color={textColor}
          dangerouslySetInnerHTML={{
            __html: t(
              "GearSearchInformation",
              "Whenever new gear is added to hikerherd it can be found here."
            ),
          }}
        ></Text>
        <Text
          mb={5}
          color={textColor}
          dangerouslySetInnerHTML={{
            __html: t(
              "GearSearchInformation2",
              "The gear data is crowd-sourced by you, so the more you use hikerherd the better it will get!"
            ),
          }}
        ></Text>

        <Card minH={"calc(100vh - 215px)"}>
          <GlobalGearSearch
            gearActions={(gear) => (
              <Fragment>
                {session.userId && (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2 }}
                    spacing={2}
                    alignItems="center"
                  >
                    <Button
                      width="full"
                      size="sm"
                      leftIcon={<FcList />}
                      onClick={() => setAdding({ type: "INVENTORY", gear })}
                    >
                      {t("AddToInventory", "Add to inventory")}
                    </Button>
                    <Button
                      width="full"
                      size="sm"
                      leftIcon={<FcRating />}
                      onClick={() => setAdding({ type: "WISH_LIST", gear })}
                    >
                      {t("AddToWishList", "Add to wish list")}
                    </Button>
                  </SimpleGrid>
                )}
              </Fragment>
            )}
          />
        </Card>
      </Fragment>
    </SidebarLayout>
  );
};

export default DiscoverGearPage;
