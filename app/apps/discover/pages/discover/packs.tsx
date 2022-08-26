import type { BlitzPage } from "blitz";

import { Fragment } from "react";

import { useTranslation } from "react-i18next";
import { Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

import SidebarLayout from "app/layouts/sidebar-layout";
import Card from "app/components/card";

import GlobalPacksSearch from "../../components/global-packs-search";

const DiscoverPacksPage: BlitzPage = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const { t } = useTranslation();

  return (
    <SidebarLayout>
      <Fragment>
        <Heading mb={4} size="md">
          {t("PackSearch", "Pack search")}
        </Heading>

        <Text
          mb={5}
          color={textColor}
          dangerouslySetInnerHTML={{
            __html: t(
              "PackSearchInformation",
              "Look for packs created by other hikers."
            ),
          }}
        ></Text>

        <Card>
          <GlobalPacksSearch />
        </Card>
      </Fragment>
    </SidebarLayout>
  );
};

export default DiscoverPacksPage;
