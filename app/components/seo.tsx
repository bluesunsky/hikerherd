import type { FC } from "react";

import { Head } from "blitz";

type SeoProps = {
  title?: string | null;
  description?: string | null;
};

const DEFAULT_TITLE = "Pack your pack";

const DEFAULT_DESCRIPTION = `
  Pack your pack est pour les randonneurs, routards et minimalistes un moyen
  de gérer et d'alléger leurs équipements afin de planifier leurs aventures.
`;

const Seo: FC<SeoProps> = ({ title, description }) => (
  <Head>
    <title>{title ? `${title} | hikerherd` : DEFAULT_TITLE}</title>
    <meta name="description" content={description || DEFAULT_DESCRIPTION} />

    <meta
      property="og:title"
      content={title ? `${title} | hikerherd` : DEFAULT_TITLE}
    />
    <meta
      property="og:description"
      content={description || DEFAULT_DESCRIPTION}
    />
    <meta
      property="og:image"
      content={process.env.BLITZ_PUBLIC_APP_ORIGIN + "/hikerherd.png"}
    />
    <meta property="og:type" content="website" />
    <meta
      name="og:title"
      content={title ? `${title} | hikerherd` : DEFAULT_TITLE}
    />

    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:image"
      content={process.env.BLITZ_PUBLIC_APP_ORIGIN + "/hikerherd.png"}
    />
    <meta name="twitter:creator" content="@benhoneywill" />
    <meta
      name="twitter:description"
      content={description || DEFAULT_DESCRIPTION}
    />
  </Head>
);

export default Seo;
