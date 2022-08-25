import type { BlitzPage } from "blitz";

import { Routes } from "blitz";

import FixedLayout from "app/layouts/fixed-layout";

import GearOrganizer from "../components/gear-organizer";
import InventorySubheader from "../components/inventory-subheader";

const WishListPage: BlitzPage = () => {
  return (
    <FixedLayout subheader={<InventorySubheader type="WISH_LIST" />}>
      <GearOrganizer type="WISH_LIST" />
    </FixedLayout>
  );
};

WishListPage.authenticate = { redirectTo: Routes.LoginPage() };

export default WishListPage;
