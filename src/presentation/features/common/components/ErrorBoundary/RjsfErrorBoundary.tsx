import { StyledPrimaryButton } from "presentation/features/core/pages/edi-edit/EdiEditPage.styles";
import { ReactElement } from "react";

import { ErrorBoundary } from "./";
import { RjsfErrorContainer, RjsfErrorTitle } from "./ErrorBoundary.styles";

type Props = {
  children: ReactElement;
  isError?: boolean;
};

export const RjsfErrorBoundary = ({
  children,
  isError,
}: Props): ReactElement => {
  return (
    <>
      <ErrorBoundary errorPadding={22} isError={isError}>
        {children}
      </ErrorBoundary>
      {isError ? (
        <RjsfErrorContainer>
          <StyledPrimaryButton onClick={() => window.location.reload()}>
            Click to reset error
          </StyledPrimaryButton>
          <RjsfErrorTitle>
            If the error still persists, please contact support
          </RjsfErrorTitle>
        </RjsfErrorContainer>
      ) : null}
    </>
  );
};

