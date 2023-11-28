import { ReactElement, ReactNode } from "react";
import * as Sentry from "@sentry/react";
import { ErrorFallback } from "./ErrorFallback";

type Props = {
  children: ReactNode;
};

export const SentryErrorBoundary = ({ children }: Props): ReactElement => {
  return (
    <Sentry.ErrorBoundary
      fallback={(parameters) => <ErrorFallback {...parameters} />}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
