import type { BlitzPage } from "blitz";

import { Routes } from "blitz";

import FixedLayout from "app/layouts/fixed-layout";

import GearOrganizer from "../components/gear-organizer";
import InventorySubheader from "../components/inventory-subheader";

const InventoryPage: BlitzPage = () => {
  return (
    <FixedLayout subheader={<InventorySubheader type="INVENTORY" />}>
      <GearOrganizer type="INVENTORY" />
    </FixedLayout>
  );
};

InventoryPage.authenticate = { redirectTo: Routes.LoginPage() };

export default InventoryPage;
