import { AxiosError } from "axios";
import { ReactElement } from "react";

import { GenericError } from "@crstl/components/atoms/error";

import { ErrorContainer } from "./ErrorBoundary.styles";

type Props = {
  children: ReactElement;
  error?: AxiosError | null;
  isError?: boolean;
  height?: number;
  errorPadding?: number;
};

export const ErrorBoundary = ({
  children,
  error,
  isError,
  height,
  errorPadding,
}: Props): ReactElement => {
  return (
    <ErrorContainer height={height}>
      {error || isError ? (
        <GenericError padding={errorPadding} />
      ) : (
        <>{children}</>
      )}
    </ErrorContainer>
  );
};

