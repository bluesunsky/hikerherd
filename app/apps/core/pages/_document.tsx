import {
  Document as BlitzDocument,
  Html,
  DocumentHead,
  Main,
  BlitzScript,
} from "blitz";

import i18next from "i18next";
/*const Analytics = () => {
  const script =
    process.env.NODE_ENV === "production"
      ? "https://scripts.simpleanalyticscdn.com/latest.js"
      : "https://scripts.simpleanalyticscdn.com/latest.dev.js";

  return <script async defer src={script} />;
};*/
// <Analytics />
class Document extends BlitzDocument {
  render() {
    return (
      <Html lang={i18next.language.toLowerCase()}>
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    );
  }
}

export default Document;
