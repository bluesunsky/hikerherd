import type { FC } from "react";
import type { AppProps } from "blitz";

import "../styles/core.css";

import { Suspense } from "react";
import { ErrorBoundary, useQueryErrorResetBoundary } from "blitz";

import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import UserPreferencesProvider from "app/apps/users/providers/user-preferences-provider";
import i18n from "app/i18n";

import AppErrorFallback from "../components/app-error-fallback";
import PageLoader from "../components/page-loader";
import LayoutLoader from "../components/layout-loader";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { reset } = useQueryErrorResetBoundary();

  const getLayout = Component.getLayout || ((page) => page);

  console.log(i18n.language);
  console.log(i18n.languages);
  return (
    <I18nextProvider i18n={i18next}>
      <ChakraProvider portalZIndex={4}>
        <ErrorBoundary FallbackComponent={AppErrorFallback} onReset={reset}>
          <UserPreferencesProvider>
            <Suspense fallback={<LayoutLoader />}>
              {getLayout(
                <Suspense fallback={<PageLoader />}>
                  <Component {...pageProps} />
                </Suspense>
              )}
            </Suspense>
          </UserPreferencesProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </I18nextProvider>
  );
};

export default App;
