import type { BlitzPage } from "blitz";

import BoxLayout from "app/layouts/box-layout";

const NotFoundPage: BlitzPage = () => {
  return null;
};

NotFoundPage.getLayout = (page) => (
  <BoxLayout title="Introuvable" description="Cette page n'existe pas.">
    {page}
  </BoxLayout>
);

export default NotFoundPage;
