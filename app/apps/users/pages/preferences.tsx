import type { BlitzPage } from "blitz";

import { Routes } from "blitz";
import { Fragment } from "react";

import { useTranslation } from "react-i18next";
import { Heading } from "@chakra-ui/layout";

import SidebarLayout from "app/layouts/sidebar-layout";
import Card from "app/components/card";

import UserPreferencesForm from "../components/user-preferences-form";

const PreferencesPage: BlitzPage = () => {
  const { t } = useTranslation();
  return (
    <SidebarLayout title={t("Settings", "Settings")}>
      <Fragment>
        <Heading size="md" mb={6}>
          {t("Settings", "Settings")}
        </Heading>

        <Card>
          <UserPreferencesForm />
        </Card>
      </Fragment>
    </SidebarLayout>
  );
};

PreferencesPage.authenticate = { redirectTo: Routes.LoginPage() };

export default PreferencesPage;
