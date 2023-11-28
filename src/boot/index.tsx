import "../globals/themes/antd/custom-theme.css";

import { queryClient } from "domain/frameworks";
import { GlobalAppStyle } from "globals/styles";
import { theme } from "globals/themes";
import { withLDProvider } from "launchdarkly-react-client-sdk";
import { AppProvider, DateRangeProvider } from "presentation/hooks/contexts";
import RootRouter from "presentation/router/root";
import { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { SentryErrorBoundary } from "./wrappers/sentry-error-boundary";

const BootApp = (): ReactElement => {
  return (
    <>
      <SentryErrorBoundary>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <BrowserRouter>
                <DateRangeProvider>
                  <GlobalAppStyle />
                  <RootRouter />
                </DateRangeProvider>
              </BrowserRouter>
            </AppProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </SentryErrorBoundary>
    </>
  );
};

export default withLDProvider({
  clientSideID: import.meta.env.VITE_APP_LAUNCHDARLY_CLIENT_ID || "",
})(BootApp);

