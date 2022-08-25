import type { BlitzPage } from "blitz";

import { useTranslation } from "react-i18next";

import BoxLayout from "app/layouts/box-layout";

const NotFoundPage: BlitzPage = () => {
  const { t } = useTranslation();
  return (
    <BoxLayout
      title={t("NotFound", "Not found")}
      description={t("NotFoundDescription", "Are you lost?")}
    ></BoxLayout>
  );
};

export default NotFoundPage;
