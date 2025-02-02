import type { BlitzPage, GetServerSideProps } from "blitz";

import { NotFoundError, useQuery, useRouter, getSession } from "blitz";
import { Fragment } from "react";

import FixedLayout from "app/layouts/fixed-layout";
import DragAndDrop from "app/components/drag-and-drop/components/drag-and-drop";
import PackSubheader from "app/apps/packs/components/pack-subheader";
import packOrganizerQuery from "app/apps/packs/queries/pack-organizer-query";
import Seo from "app/components/seo";
import PrefetchQueryClient from "app/helpers/prefetch-query-client";
import useEditorText from "app/components/editor/hooks/use-editor-text";

const PackSharePage: BlitzPage = () => {
  const router = useRouter();

  const [packOrganizer] = useQuery(packOrganizerQuery, {
    id: router.query.packId as string,
  });

  const description = useEditorText(
    packOrganizer?.notes || "",
    {
      image: true,
      blockquote: true,
      heading: true,
      horizontalRule: true,
    },
    {
      uppercaseHeadings: false,
      limits: {
        maxChildNodes: 4,
      },
    }
  );

  return (
    <FixedLayout subheader={<PackSubheader share />}>
      <Fragment>
        <Seo
          title={packOrganizer.name}
          description={description.replace(/(\n)+/g, " ")}
        />
        <DragAndDrop state={packOrganizer.categories} readonly />
      </Fragment>
    </FixedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = new PrefetchQueryClient(ctx);

  try {
    const packId = ctx.params?.packId as string;
    const pack = await client.prefetchQuery(packOrganizerQuery, { id: packId });
    const session = await getSession(ctx.req, ctx.res);

    if (pack.private && session.role === "USER") {
      throw new NotFoundError();
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { notFound: true };
    } else {
      throw error;
    }
  }

  return {
    props: {
      dehydratedState: client.dehydrate(),
    },
  };
};

export default PackSharePage;
