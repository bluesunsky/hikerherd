import type { BlitzPage } from "blitz";

import { useRouter } from "blitz";
import React from "react";

import FixedLayout from "../../../../../../app/layouts/fixed-layout";
import GearOrganizer from "../../../components/gear-organizer";
import InventorySubheader from "../../../components/inventory-subheader";

const WishListSharePage: BlitzPage = () => {
  const router = useRouter();
  return (
    <FixedLayout subheader={<InventorySubheader type="WISH_LIST" />}>
      <GearOrganizer
        type="WISH_LIST"
        username={
          !Array.isArray(router.query.username) ? router.query.username : ""
        }
      />
    </FixedLayout>
  );
};

export default WishListSharePage;
