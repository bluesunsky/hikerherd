import type { FC } from "react";
import type { AppProps } from "blitz";

import "../styles/core.css";

import React, { Suspense } from "react";
import { ErrorBoundary, useQueryErrorResetBoundary } from "blitz";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import UserPreferencesProvider from "app/apps/users/providers/user-preferences-provider";

import AppErrorFallback from "../components/app-error-fallback";
import PageLoader from "../components/page-loader";
import LayoutLoader from "../components/layout-loader";

const theme = extendTheme({
  components: {
    Tooltip: {
      // Styles for the base style
      baseStyle: {
        color: "white",
        bg: "gray.700",
      },
      // Styles for the size variations
      sizes: {},
      // Styles for the visual style variations
      variants: {
        redMode: () => {
          return {
            color: "white",
            bg: "red.500",
          };
        },
      },
      // The default `size` or `variant` values
      defaultProps: {},
    },
  },
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <I18nextProvider i18n={i18next}>
      <ChakraProvider portalZIndex={4} theme={theme}>
        <ErrorBoundary FallbackComponent={AppErrorFallback} onReset={reset}>
          <UserPreferencesProvider>
            <Suspense fallback={<LayoutLoader />}>
              <Suspense fallback={<PageLoader />}>
                <Component {...pageProps} />
              </Suspense>
            </Suspense>
          </UserPreferencesProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </I18nextProvider>
  );
};

export default App;
