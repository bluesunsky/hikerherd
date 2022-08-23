/*import type { BlitzPage, GetServerSideProps } from "blitz";

import { NotFoundError, useQuery, useRouter, getSession } from "blitz";
import { Fragment } from "react";

import FixedLayout from "app/layouts/fixed-layout";
import DragAndDrop from "app/components/drag-and-drop/components/drag-and-drop";
import PackSubheader from "app/apps/packs/components/pack-subheader";
import packOrganizerQuery from "app/apps/packs/queries/pack-organizer-query";
import Seo from "app/components/seo";
import PrefetchQueryClient from "app/helpers/prefetch-query-client";
import useEditorText from "app/components/editor/hooks/use-editor-text";
*/

import type { BlitzPage } from "blitz";

import { Routes, useRouter } from "blitz";
import React from "react";

import FixedLayout from "../../../../../../app/layouts/fixed-layout";
import GearOrganizer from "../../../components/gear-organizer";
import InventorySubheader from "../../../components/inventory-subheader";

const WishListSharePage: BlitzPage = () => {
  const router = useRouter();
  return <GearOrganizer type="WISH_LIST" username={router.query.username} />;
};

WishListSharePage.authenticate = { redirectTo: Routes.LoginPage() };
WishListSharePage.getLayout = (page) => (
  <FixedLayout subheader={<InventorySubheader type="WISH_LIST" />}>
    {page}
  </FixedLayout>
);

export default WishListSharePage;
