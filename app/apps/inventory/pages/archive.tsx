import type { BlitzPage } from "blitz";

import { Routes } from "blitz";

import FixedLayout from "app/layouts/fixed-layout";

import GearOrganizer from "../components/gear-organizer";
import InventorySubheader from "../components/inventory-subheader";

const ArchivePage: BlitzPage = () => {
  return (
    <FixedLayout subheader={<InventorySubheader type="ARCHIVE" />}>
      <GearOrganizer type="ARCHIVE" />
    </FixedLayout>
  );
};

ArchivePage.authenticate = { redirectTo: Routes.LoginPage() };

export default ArchivePage;
