import type { BlitzPage } from "blitz";

import { Fragment } from "react";

import { useTranslation } from "react-i18next";
import { Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

import SidebarLayout from "app/layouts/sidebar-layout";
import Card from "app/components/card";

import GlobalUsersSearch from "../../components/global-users-search";
// <QuantityPicker
const DiscoverUsersPage: BlitzPage = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const { t } = useTranslation();
  return (
    <SidebarLayout>
      <Fragment>
        <Heading mb={4} size="md">
          {t("UserSearch", "User search")}
        </Heading>

        <Text
          mb={5}
          color={textColor}
          dangerouslySetInnerHTML={{
            __html: t("UserSearchInformation", "Look for hiker."),
          }}
        ></Text>

        <Card>
          <GlobalUsersSearch />
        </Card>
      </Fragment>
    </SidebarLayout>
  );
};

export default DiscoverUsersPage;
